import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILabShell
} from '@jupyterlab/application';

import { CodespaceMenu } from './CodespaceMenu';

import { NotebookActions } from '@jupyterlab/notebook';

import { requestAPI } from './handler';

/**
 * Initialization data for the myextension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'myextension:plugin',
  autoStart: true,
  requires: [ILabShell],
  activate: (app: JupyterFrontEnd, shell: ILabShell) => {
    console.log('JupyterLab extension myextension is activated! ', app);
    
    // Get codespace info
    // const hostname = window.location.hostname;

    // let parts = hostname.split("-");
    // const githubUsername = parts[0];
    // parts.pop();
    
    // console.log("Username: ", githubUsername);
    // console.log(parts);

    requestAPI<any>('hello')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The myextension server extension appears to be missing.\n${reason}`
        );
      });
    
    // Create UI left sidebar widget
    const widget = new CodespaceMenu();
    // widget.id = '@jupyterlab-sidepanel/example';
    // widget.title.iconClass = "jp-SpreadsheetIcon jp-SideBar-tabIcon";
    // widget.title.caption = "Codespace Panel";

    // let summary = document.createElement('p');
    // widget.node.appendChild(summary);
    // summary.innerText = "Hello, World!";
    shell.add(widget, 'left'); 
    
    // Reference: https://blog.ouseful.info/2022/04/28/jupyterlab-cell-status-indicator/
    NotebookActions.executed.connect((_, args) => {
      // The following construction seems to say 
      // something akin to: const cell = args["cell"]
      const { cell } = args;
      const { success } = args;
      // If we have a code cell, update the status
      if (cell.model.type == 'code') {
        if (success)
          console.log("cell executed!");
        else
          console.log("cell execution error occurred!");
      }
    });
  }
};

// function __tryToGetNotebook(app: JupyterFrontEnd){
//   var notebookPanel = __getFirstVisibleNotebookPanel(app);
//   return notebookPanel
//       ?notebookPanel.content
//       :null;
// }


// function __getFirstVisibleNotebookPanel(app: JupyterFrontEnd){
//   var mainWidgets = app.shell.widgets('main');
//   var widget = mainWidgets.next();
//   while(widget){
//       var type = widget.sessionContext.type;
//       if(type == 'notebook'){  //other wigets might be of type DocumentWidget
//           if (widget.isVisible){
//               return widget;
//           }
//       }
//       widget = mainWidgets.next();
//   }
//   return null;
// }

export default plugin;
