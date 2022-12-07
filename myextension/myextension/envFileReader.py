import base64
import requests

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