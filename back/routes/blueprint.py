from flask import Blueprint
from controllers.usersControllers import (
    index, 
    create, 
    insert,
    update,
    delete, 
    login,
    logout,
    get_me
)

blueprint = Blueprint('blueprint', __name__)

blueprint.route('/', methods=['GET'])(create)

#crud user
blueprint.route('/getme', methods=['GET'])(get_me)
blueprint.route('/users', methods=['GET'])(index)
blueprint.route('/users', methods=['POST'])(insert)
blueprint.route('/users', methods=['PUT'])(update)
blueprint.route('/users', methods=['DELETE'])(delete)

#connection management
blueprint.route('/login', methods=['POST'])(login)
blueprint.route('/logout', methods=['POST'])(logout)