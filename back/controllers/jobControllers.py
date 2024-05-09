from flask import request, jsonify,send_file
import os,random,time
from flask_jwt_extended import jwt_required,get_jwt_identity 
from services.job_service import (
    insert_logic, 
    index_logic,
    update_logic,
    delete_logic,
    get_job_by_id_user
)
from k8s_config import get_k8s
from kubernetes.stream import stream
k8s = get_k8s()

@jwt_required()
def get_job_by_user():
    try:
        user_id, user_role = get_jwt_identity()
        response, status_code = get_job_by_id_user(user_id)
        return jsonify(response), status_code

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error', "error": str(e)}), 500

@jwt_required()
def index_job():
    try:
        user_id, user_role = get_jwt_identity()
        if user_role != "admin":
            return jsonify({"message": "You are not authorized to access this resource."}), 403
        response, status_code = index_logic()
        return response, status_code
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error', "error": str(e)}), 500

@jwt_required()
def create_job():
    try:
        pod_namespace = "default"
        #get data
        job_data = request.get_json()
        user_id, user_role = get_jwt_identity()
        if user_role != "vip" and user_role != "admin":
            if len(get_job_by_id_user(user_id)[0])>=2:
                return jsonify({"message": "acheter le VIP pour avoir plus d'assaie."}), 403

        #insert job in loading
        job_db, status_code = insert_logic(user_id,job_data)

        name = 'runner-'+str(random.randint(1, 10000))
        resp = None

        #create instance
        print(f"Pod {name} does not exist. Creating it...")
        pod_manifest = {
            'apiVersion': 'v1',
            'kind': 'Pod',
            'metadata': {
                'name': name
            },
            'spec': {
                'containers': [{
                    'image': job_data.get('images'),
                    'name': name,
                    "args": [
                        "/bin/sh",
                        "-c",
                        "while true;do date;sleep 5; done"
                    ],
                    'namespace':pod_namespace
                }]
            }
        }
        resp = k8s.create_namespaced_pod(body=pod_manifest,
                                                  namespace=pod_namespace)
        #wait the pod
        while True:
            resp = k8s.read_namespaced_pod(name=name,
                                                    namespace=pod_namespace)
            if resp.status.phase != 'Pending':
                break
            time.sleep(1)
        print("Done.")
        commands_clone = [
            "apt-get update && apt-get install -y git",
            f"git clone {job_data.get('repo')} project",   
        ]
        
        for command in commands_clone:
            exec_command = ['/bin/sh', "-c", command]
            resp = stream(k8s.connect_get_namespaced_pod_exec,
                        name,
                        'default',
                        command=exec_command,
                        stderr=True, stdin=False,
                        stdout=True, tty=False,
                        _preload_content=False)
            
            while resp.is_open():
                resp.update(timeout=1000)
                if resp.peek_stdout():
                    print("STDOUT: %s" % resp.read_stdout())
                if resp.peek_stderr():
                    print("STDERR: %s" % resp.read_stderr())

            resp.close()
        retour_commande=[]
        commands = job_data.get('commands')
        for command in commands:
            retour_commande.append(f"commande: {command}")
            exec_command = ['/bin/sh', "-c",f"cd project && {command}"]
            resp = stream(k8s.connect_get_namespaced_pod_exec,
                        name,
                        'default',
                        command=exec_command,
                        stderr=True, stdin=False,
                        stdout=True, tty=False,
                        _preload_content=False)
            
            while resp.is_open():
                resp.update(timeout=1000)
                if resp.peek_stdout():
                    retour_commande.append(resp.read_stdout())
                if resp.peek_stderr():
                    retour_commande.append(resp.read_stderr())

            resp.close()

        k8s.delete_namespaced_pod(name, namespace=pod_namespace)

        file_name= str(name)+str(user_id)+".txt"
        controllers_dir = os.path.abspath(os.path.dirname(__file__))
        flask_dir = os.path.dirname(controllers_dir)
        logs_dir = os.path.join(flask_dir, 'logs')
        file_path = os.path.join(logs_dir, file_name)
        
        with open(file_path, 'w') as file:
            for item in retour_commande:
                file.write("%s\n" % item)

        job_db, status_code = update_logic(job_db["id"],{"status":"validate", "logs": file_name})
        return jsonify(job_db), status_code
    
    except Exception as e:
        print(e)
        k8s.delete_namespaced_pod(name, namespace=pod_namespace)
        update_logic(job_db["id"],{"status":"error"})
        return jsonify({'message': 'Internal Server Error', "error": str(e)}), 500

@jwt_required()
def delete_job(id):
    try:
        user_id, user_role = get_jwt_identity()
        if user_role != "admin":
            return jsonify({"message": "You are not authorized to access this resource."}), 403
        response, status_code = delete_logic(id)
        return jsonify(response), status_code

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error', "error": str(e)}), 500

@jwt_required()   
def download_file(file):
    try:
        controllers_dir = os.path.abspath(os.path.dirname(__file__))
        flask_dir = os.path.dirname(controllers_dir)
        logs_dir = os.path.join(flask_dir, 'logs')
        file_path = os.path.join(logs_dir, file)
        if os.path.exists(file_path):
            return send_file(file_path, as_attachment=True)
        else:
            return jsonify({'error': 'file not fount', "error": str(e)}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error', "error": str(e)}), 500