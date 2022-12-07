import json

from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
#from envFileReader import getCodespace
import tornado

class RouteHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        #codespace_json = getCodespace()
        # self.finish(json.dumps({
        #     "codespace_name": codespace_json["display_name"],
        #     "repo_name": codespace_json["repository"]["full_name"],
        #     "machine": codespace_json["machine"]["display_name"],
        #     "git_ref": codespace_json["git_status"]["ref"],
        #     "git_behind": codespace_json["git_status"]["behind"],
        #     "git_ahead": codespace_json["git_status"]["ahead"],
        #     "idle_timeout_minutes": codespace_json["idle_timeout_minutes"],
        #     "created_at": codespace_json["created_at"],
        #     "retention_period_days": round(codespace_json["retention_period_minutes"] * 0.000694444)
        # }))
        self.finish(json.dumps({"data": "This is /myextension/hello endpoint!"}))

def setup_handlers(web_app):
    host_pattern = ".*$"

    base_url = web_app.settings["base_url"]
    route_pattern = url_path_join(base_url, "myextension", "hello")
    handlers = [(route_pattern, RouteHandler)]
    web_app.add_handlers(host_pattern, handlers)
