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

    requestAPI<any>('hello')
      .then(data => {
        console.log(data);
        const widget = new CodespaceMenu(data);
        shell.add(widget, 'left'); 
      })
      .catch(reason => {
        console.error(
          `The myextension server extension appears to be missing.\n${reason}`
        );
      });
    
    // Reference: https://blog.ouseful.info/2022/04/28/jupyterlab-cell-status-indicator/
    NotebookActions.executed.connect((_, args) => {
      // The following construction seems to say 
      // something akin to: const cell = args["cell"]
      const { cell } = args;
      const { success } = args;
      var fileString = cell.parent ? "in " + cell.parent.title.label : "";
      // If we have a code cell, update the status
      if (success)
        console.log(`${cell.model.type} executed in ${fileString}`);
      else
        console.log(`cell execution error in ${fileString}`);
    });
    
    var mainWidgets = app.shell.widgets('main');
    console.log(mainWidgets);
    var widget = mainWidgets.next();
    while(widget){
      console.log(widget);
      widget = mainWidgets.next();
    }
  }
};

// function __tryToGetNotebook(app: JupyterFrontEnd){
//   var notebookPanel = __getFirstVisibleNotebookPanel(app);
//   return notebookPanel
//       ?notebookPanel.content
//       :null;
// }


// function __getActivity(app: JupyterFrontEnd){
  // var mainWidgets = app.shell.widgets('main');
  // var widget = mainWidgets.next();
  // while(widget){
  //     console.log(widget);
  //     widget = mainWidgets.next();
  // }
  // return null;
// }

export default plugin;
