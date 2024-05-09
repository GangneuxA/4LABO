from flask import jsonify
from models.job import job
from db_config import get_db

db= get_db()


def create_db_logic():
    try:
        db.create_all()
        db.session.commit()
        return {"message": "succesful created to job table"},200

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error', "error": str(e)}), 500

def get_job_by_id_user(user_id):
    try:
        jobs = job.query.filter_by(user=user_id)

        job_data = [job_user.to_json() for job_user in jobs]
        return job_data, 200

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error', "error": str(e)}), 500
    
def index_logic():
    try:
        all_job = job.query.all()
        job_data = [jobs.to_json() for jobs in all_job]
        return job_data, 200

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error', "error": str(e)}), 500


def insert_logic(user_id, job_data):
    try:
        images = job_data.get('images')
        commands = job_data.get('commands')
        repo = job_data.get('repo')
        user = user_id

        new_job = job(images=images,
                         commands=commands, user=user,repo=repo)

        db.session.add(new_job)
        db.session.commit()

        return new_job.to_json(), 201

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'message': 'Internal Server Error', "error": str(e)}), 500

def update_logic(job_id,job_data):
    try:
        jobs = job.query.get(job_id)
        jobs.status = job_data.get('status')
        if job_data.get('logs'):
            jobs.logs = job_data.get('logs')
        db.session.commit()
        return {'message': 'job updated successfully'}, 200
    
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'message': 'Internal Server Error', "error": str(e)}), 500

def delete_logic(job_id):
    try:
        jobs = job.query.get(job_id)
        db.session.delete(jobs)
        db.session.commit()
        return {'message': 'job deleted successfully'}, 200

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'message': 'Internal Server Error', "error": str(e)}), 500
    
