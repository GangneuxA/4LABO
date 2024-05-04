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
        #get data
        job_data = request.get_json()
        user_id, user_role = get_jwt_identity()
        if user_role != "vip" and user_role != "admin":
            if len(get_job_by_id_user(user_id))>=2:
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
                    'image': 'busybox',
                    'name': 'sleep',
                    "args": [
                        "/bin/sh",
                        "-c",
                        "while true;do date;sleep 5; done"
                    ],
                    'namespace':'default'
                }]
            }
        }
        resp = k8s.create_namespaced_pod(body=pod_manifest,
                                                  namespace='default')
        #wait the pod
        while True:
            resp = k8s.read_namespaced_pod(name=name,
                                                    namespace='default')
            if resp.status.phase != 'Pending':
                break
            time.sleep(1)
        print("Done.")

        exec_command = [
            "/bin/sh",
            "-c",
            f"git clone {job_data.get('repo')}\n"
        ]
        #execute the commande
        resp = stream(k8s.connect_get_namespaced_pod_exec,
            name=name,
            namespace='default',
            container="busybox",
            command=exec_command,
            stderr=True,
            stdin=False,
            stdout=False,
            tty=False,
            _preload_content=False
        )       

        print("ici")
        while resp.is_open():
            resp.update(timeout=1)
        if resp.peek_stdout():
            print("STDOUT: %s" % resp.read_stdout())
        if resp.peek_stderr():
            print("STDERR: %s" % resp.read_stderr())


        # commands = job_data.get('commands')

        # while resp.is_open():
        #     resp.update(timeout=1)
        #     if resp.peek_stdout():
        #         print(f"STDOUT: {resp.read_stdout()}")
        #     if resp.peek_stderr():
        #         print(f"STDERR: {resp.read_stderr()}")
        #     if commands:
        #         c = commands.pop(0)
        #         print(f"Running command... {c}\n")
        #         resp.write_stdin(c + "\n")
        #     else:
        #         break

        #destruction du pod
        api_response = k8s.delete_namespaced_pod(name, namespace='default')
        print(api_response)

        file= str(name)+".txt"


        job_db, status_code = update_logic(job_db["id"],{"status":"error", "logs": file})
        return jsonify(job_db), status_code
    
    except Exception as e:
        print(e)
        api_response = k8s.delete_namespaced_pod(name, namespace='default')
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
        return send_file(file_path, as_attachment=True)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error', "error": str(e)}), 500