from kubernetes import config
from kubernetes.client import Configuration
from kubernetes.client.api import core_v1_api
from dotenv import load_dotenv
import os

# config.load_kube_config()



c = Configuration()
# c.assert_hostname = False


c.host = os.getenv('K8S_URI')
c.ssl_no_verify = True
c.verify_ssl = False
Configuration.set_default(c)
core_v1 = core_v1_api.CoreV1Api()

def get_k8s():
    return core_v1