from flask import Blueprint
from controllers.usersControllers import (
    index, 
    create, 
    insert,
    update,
    delete, 
    login,
    logout,
    get_me,
    update_admin,
    delete_admin
)
from controllers.jobControllers import (
    get_job_by_user, 
    index_job, 
    create_job,
    delete_job,
    download_file
)

blueprint = Blueprint('blueprint', __name__)

blueprint.route('/', methods=['GET'])(create)

#crud user
blueprint.route('/getme', methods=['GET'])(get_me)
blueprint.route('/users', methods=['GET'])(index) #require admin
blueprint.route('/users', methods=['POST'])(insert)
blueprint.route('/users', methods=['PUT'])(update)
blueprint.route('/users', methods=['DELETE'])(delete)

#admin management user
blueprint.route('/admin/<int:id>', methods=['PUT'])(update_admin)
blueprint.route('/admin/<int:id>', methods=['DELETE'])(delete_admin)

#connection management
blueprint.route('/login', methods=['POST'])(login)
blueprint.route('/logout', methods=['POST'])(logout)

#crud job
blueprint.route('/users/job', methods=['GET'])(get_job_by_user)
blueprint.route('/job', methods=['GET'])(index_job) #require admin
blueprint.route('/job', methods=['POST'])(create_job)
blueprint.route('/job/<int:id>', methods=['DELETE'])(delete_job) #require admin

blueprint.route('/download/<path:file>', methods=['GET'])(download_file)
