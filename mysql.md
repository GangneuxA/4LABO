# Mysql for development

Mysql nous sert de bdd relationnel entre les job et les users

## install

Pour intsaller MYSQL il faut suivre le script suivant

```
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql.service
```

Une fois installer il faut ce connecté

```
#la premiere connection vous fera rentrer un mot de passe retenez le bien.
sudo mysql

#Ensuite on se connecte avec sont mots de passe
mysql -u root -p

```

Nous voila dans le prompt mysql on vas créé une database.

```
CREATE DATABASE my_database;

```

Maintenant vous avez votre base de donnée de prêt

Les credential sont :

```
"mysql+PyMySQL://root:<Votre mot de passe>@<ip de votre machine>:3306/<votre DATABASE>"
```

# install to devel

Vous pouvez utilisez xampp en developpement qui vous donne l'acces a phpmyadmin
