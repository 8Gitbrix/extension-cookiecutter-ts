import { Widget } from '@lumino/widgets';

class CodespaceMenu extends Widget {
    constructor() {
      super();
      this.addClass('codespace-menu-box');
      this.id = '@jupyterlab-sidepanel/example';
      this.title.iconClass = "jp-SpreadsheetIcon jp-SideBar-tabIcon";
      this.title.caption = "Codespace Panel";
    }
}

export { CodespaceMenu };