from flask import request, jsonify
from flask_jwt_extended import create_access_token, unset_jwt_cookies,jwt_required,get_jwt_identity 
import json
from models.users import users, db
from services.user_service import (
    insert_logic, 
    create_logic,
    index_logic,
    update_logic,
    delete_logic,
    logout_service,
    login_service,
    get_user_by_id_service
)

def create():
    try:
        response, status_code = create_logic()
        return jsonify(response), status_code
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500

@jwt_required()  # Require JWT token for authentication
def get_me():
    try:
        user_id, user_role = get_jwt_identity()
        response, status_code = get_user_by_id_service(user_id)
        return jsonify(response), status_code

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500

def index():
    try:
        response, status_code = index_logic()
        return response, status_code
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500

def insert():
    try:
        user_data = request.get_json()
        response, status_code = insert_logic(user_data)
        return jsonify(response), status_code
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500
    
@jwt_required()
def update():
    try:
        user_id, user_role = get_jwt_identity()
        user_data = request.get_json()
        response, status_code = update_logic(user_id, user_data)
        return jsonify(response), status_code
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500

@jwt_required()
def delete():
    try:
        user_id, user_role = get_jwt_identity()
        response, status_code = delete_logic(user_id)
        return jsonify(response), status_code

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500
    
def login():
    try:
        credentials = request.get_json()
        response, status_code = login_service(credentials)
        return jsonify(response), status_code
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500

@jwt_required()
def logout():
    try:
        response, status_code = logout_service()
        return jsonify(response), status_code

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500