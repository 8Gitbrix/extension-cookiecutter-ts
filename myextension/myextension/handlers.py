from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
from datetime import datetime
import requests
import tornado
import base64
import json
import maya

GITHUB_TOKEN = "GITHUB_TOKEN"
CODESPACE_NAME = "CODESPACE_NAME"
ENV_FILE_PATH = "/workspaces/.codespaces/shared/.env-secrets"
URL = "https://api.github.com/user/codespaces/"

def readEnvFile():
    codespace_token, codespace_name = None, None
    with open(ENV_FILE_PATH, "r") as file:
        lines = file.readlines()
        for line in lines:
            if GITHUB_TOKEN in line:
                codespace_token = base64.b64decode(line[line.index("=")+1:]).decode('utf-8')
            elif CODESPACE_NAME in line:
                codespace_name = base64.b64decode(line[line.index("=")+1:]).decode('utf-8')

    return codespace_name, codespace_token

def getCodespace():
    codespace_name, codespace_token = readEnvFile()
    response = requests.get(URL + codespace_name, headers={'Authorization': f'token {codespace_token}'})
    return response.json()

class RouteHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        codespace_json = getCodespace()
        days_ago = datetime.now() - maya.parse(codespace_json["created_at"]).datetime(naive=True)
        self.finish(json.dumps({
            "codespace_name": codespace_json["display_name"],
            "repo_name": codespace_json["repository"]["full_name"],
            "machine": codespace_json["machine"]["display_name"],
            "git_ref": codespace_json["git_status"]["ref"],
            "git_behind": codespace_json["git_status"]["behind"],
            "git_ahead": codespace_json["git_status"]["ahead"],
            "idle_timeout_minutes": codespace_json["idle_timeout_minutes"],
            "created_days_ago": days_ago.days,
            "retention_period_days": round(codespace_json["retention_period_minutes"] * 0.000694444)
        }))

def setup_handlers(web_app):
    host_pattern = ".*$"

    base_url = web_app.settings["base_url"]
    route_pattern = url_path_join(base_url, "myextension", "hello")
    handlers = [(route_pattern, RouteHandler)]
    web_app.add_handlers(host_pattern, handlers)
