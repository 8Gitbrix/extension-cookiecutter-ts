import { ReactWidget } from '@jupyterlab/apputils';
import React, { useState } from 'react';

class CodespaceMenu extends ReactWidget {
    constructor() {
      super();
      this.addClass('codespace-menu-box');
      this.id = '@jupyterlab-sidepanel/example';
      this.title.iconClass = "jp-SpreadsheetIcon jp-SideBar-tabIcon";
      this.title.caption = "Codespace Panel";
    }

    render(): JSX.Element {
      return <div>
        <h3>GITHUB CODESPACES</h3>
        <p>{this.props.codespace_name}</p>
      </div>;
    }
}

export { CodespaceMenu };