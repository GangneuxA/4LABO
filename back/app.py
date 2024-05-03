# Importing the necessary modules and libraries
from flask import Flask
from flask_migrate import Migrate
from routes.blueprint import blueprint
from models.users import db
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)  # flask app object
    app.config.from_object('config')  # Configuring from Python Files
    JWTManager(app)
    db.init_app(app)  # Initializing the database
    return app


app = create_app()
app.register_blueprint(blueprint, url_prefix='/')
migrate = Migrate(app, db)

if __name__ == '__main__':  # Running the app
    app.run(host='127.0.0.1', port=5000, debug=True)