# Kubernetes for development

Pour des questions de coût materiels et de gestion humaines pour le developement de l'application nous avons choisie minikube pour orchestrer notre K8S par la suite nous passerons sur un K8S d'entrerprise dans le cloud comme par exemple avec GCP ou AWS

## prérequit

2 CPUs ou plus,  
2GB de memoire ram libre,  
20GB de stockage,  
Une connection internet,

## install

Nous avons choisie pour les contenaire docker mais libre a vous de changer si vous le souhaitez minikube propose beaucoup de solution differentes comme Podman hyper-v etc
Pour installer docker utiliser ces commandes :

```BASH
sudo apt install curl
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt install docker-ce
sudo usermod -aG docker $USER && newgrp docker

#pour verifier si docker est bien installé
docker --version
```

Pour installer minikube utiliser ces commandes :

```BASH
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64
alias kubectl="minikube kubectl --"
minikube addons enable ingress
#set le driver de conternaire
minikube config set driver docker
#demarer le cluster
minikube start
#pour exposer l'API kubectl
minikube kubectl -- proxy --address='0.0.0.0' --accept-hosts='^*$' --port=8080 --disable-filter &

```

une fois docker et minikube installer vous pouvez utiliser Kubectl directement ou l'api est exposé sur http://<votre ip>:8080

## cluster

il est possible d'installer un deuxieme node de cluaster avec la commande suivante :

```BASH
minikube start -p cluster2

```
