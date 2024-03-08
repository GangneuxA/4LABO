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
FLASK_APP = "bookhotel.py"
FLASK_ENV = "development"
FLASK_RUN_PORT = "5000"
APP_SUPER_KEY="YourSuperKey"
DEV_DATABASE_URL="mysql+pymysql://root:root@localhost:3306/bookhotel"
TEST_DATABASE_URL="mysql+pymysql://root:root@localhost:3306/bookhotel"
```

in folder back install the dependance with

```
pip install -r .\requirements.txt
```

Create tables of database with

```
flask db upgrade
```

if you want users exemples import bdd_test.sql in our database.
you have 3 users for exemple with different roles (user,employee,admin)

Launch project with

```
flask run
```

Api is available on http://localhost:5000/

Api docs is available on http://localhost:5000/api/docs
