from flask_jwt_extended import create_access_token, unset_jwt_cookies
from flask import jsonify
from models.users import users, db


def create_logic():
    try:
        # create tables if not exists.
        db.create_all()
        db.session.commit()
        return {},200

    except Exception as e:
        print(e)
        return {},500

def get_user_by_id_service(user_id):
    try:
        user = users.query.filter_by(id=user_id).first()

        if not user:
            return {'message': 'User not found'}, 404

        return user.to_json(), 200

    except Exception as e:
        print(e)
        return {'message': 'Internal Server Error'}, 500
    
def index_logic():
    try:
        all_users = users.query.all()
        users_data = [user.to_json() for user in all_users]
        return users_data, 200

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500


def insert_logic(user_data):
    try:
        name = user_data.get('name')
        companie = user_data.get('companie')
        email = user_data.get('email')
        password = user_data.get('password')

        new_user = users(name=name,
                         companie=companie, email=email)
        new_user.set_password(password)

        db.session.add(new_user)
        db.session.commit()

        user_json = new_user.to_json()

        return user_json, 201

    except Exception as e:
        print(e)
        db.session.rollback()
        return {'message': 'Failed to add user'}, 500

def update_logic(user_id,user_data):
    try:
        user = users.query.get(user_id)
        user.name = user_data.get('name')
        user.companie = user_data.get('companie')
        user.email = user_data.get('email')
        db.session.commit()
        return {'message': 'User updated successfully'}, 200
    
    except Exception as e:
        print(e)
        db.session.rollback()
        return {'message': 'Failed to update user'}, 500


def delete_logic(user_id):
    try:
        user = users.query.get(user_id)
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully'}, 200

    except Exception as e:
        print(e)
        db.session.rollback()
        return {'message': 'Failed to delete user'}, 500
    
def login_service(credentials):
    try:
        email = credentials.get('email')
        password = credentials.get('password')
        user = users.query.filter_by(email=email).first()

        if not user:
            return {'message': 'Invalid credentials'}, 401

        if not user.check_password(password):
            return {'message': 'Invalid credentials'}, 401

        access_token = create_access_token(identity=(user.id, user.role))
        return {'access_token': access_token}, 200

    except Exception as e:
        print(e)
        return {'message': 'Internal Server Error'}, 500

def logout_service():
    try:
        response = {'message': 'Logout successful'}
        unset_jwt_cookies(response)
        return response, 200
    except Exception as e:
        print(e)
        return {'message': 'Internal Server Error'}, 500
    
