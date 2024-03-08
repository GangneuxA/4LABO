import os
from . import create_app, db
from .models import hotel, Image, user, chambres, booking
from flask import jsonify, request
from flask_migrate import Migrate
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
    JWTManager,
)
from flask_swagger_ui import get_swaggerui_blueprint

app = create_app(os.getenv("FLASK_ENV") or "default")
app.config["JWT_SECRET_KEY"] = os.environ["APP_SUPER_KEY"]
migrate = Migrate(app, db)
jwt = JWTManager(app)

##############
#   swagger   #
##############


SWAGGER_URL = "/api/docs"
API_URL = "/static/swagger.json"

# Call factory function to create our blueprint
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={"app_name": "Test application"},
)

app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)


