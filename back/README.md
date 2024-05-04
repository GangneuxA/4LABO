# Project 4LAbo back

For launch project back without docker

create a database mysql with mysql.md.

clone this project

in root of project

create venv with this command :

```
python3 -m venv .venv
```

enter in venv with

```
Set-ExecutionPolicy Unrestricted -Scope Proces
.\.venv\Scripts\activate
```

then create .env in folder back and edit with your credentials of mysql and create your super key

```
FLASK_APP = "app.py"
FLASK_ENV = "development"
FLASK_RUN_PORT = "5000"
APP_SUPER_KEY="youtube"
SQLALCHEMY_DATABASE_URI='mysql://root:root@localhost:3306/4labo'
K8S_URI="http://192.168.0.129:8080"
```

in folder back install the dependance with

```
pip install -r .\requirements.txt
```

Launch project with

```
flask run
```

Go on http://localhost:5000/ for initialise the bdd

Api docs is available on http://localhost:5000/api/docs
