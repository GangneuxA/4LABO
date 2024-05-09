# Project 4LAbo

The project is create with docker compose with one back pods and one front pods

the back pod is connected with Kubernetes (minikube for the development) and database pod then follow this shema
![Alt text](/images/db.png "follow this model")

## Launch project with docker

to launch project with docker create your k8s cluster with k8s.md 

then created your k8s cluster, you connect from the VM and lauch this commande
```
minikube kubectl -- proxy --address='0.0.0.0' --accept-hosts='^*$' --port=8080 --disable-filter &
```
be careful not to disconnect from the machine K8S  

next using this command:

```
docker-compose up
```

next go to this link for initialize the bdd : http://localhost:5001

## Launch project without docker

to launch project with docker create your k8s with file k8s.md cluster  
Next create your bdd with mysql.md  
Next create your back with readme.md in back folder  
Next create your front with readme.md in front folder

go to this link for initialize the bdd : http://localhost:5001

## DOCS on API

A swagger is available one this links : http://localhost:5001/api/docs

## Lauch test on API

Create and enter in venv

```
python3 -m venv .venv
Set-ExecutionPolicy Unrestricted -Scope Proces
.\.venv\Scripts\activate
```

then create .env in folder back and edit with your credentials of mysql and create your super key

```
FLASK_APP = "app.py"
FLASK_ENV = "development"
FLASK_RUN_PORT = "5001"
APP_SUPER_KEY="youtube"
SQLALCHEMY_DATABASE_URI='mysql://root:root@localhost:3306/4labo'
K8S_URI="http://192.168.0.129:8080"
```

for launch the test in folder back

```
python -m unittest test.<Name file of wish test>
```

(without .py)

it exists this list of unit test

- test_users  
- test_job  
  each model test GET, POST, PUT and DELETE
