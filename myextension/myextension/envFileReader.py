import base64
import requests
from datetime import datetime
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

import json
codespace_json = getCodespace()
days_ago = datetime.now() - maya.parse(codespace_json["created_at"]).datetime(naive=True)
print(json.dumps({
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