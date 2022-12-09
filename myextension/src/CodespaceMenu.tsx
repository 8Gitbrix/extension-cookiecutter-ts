import { ReactWidget } from '@jupyterlab/apputils';
import { LabIcon } from '@jupyterlab/ui-components';
import React from 'react';
import vmSvgstr from '../icons/vm.svg';
import bookSvgstr from '../icons/book.svg';
import watchSvgstr from '../icons/watch.svg';
import repoSvgstr from '../icons/repo.svg';
import tagSvgstr from '../icons/tag.svg';
import historySvgstr from '../icons/history.svg';
import sourceControlSvgstr from '../icons/source-control.svg';

export const createdIcon = new LabIcon({
  name: 'created',
  svgstr: bookSvgstr
});

export const timeoutIcon = new LabIcon({
  name: 'timeout',
  svgstr: watchSvgstr
});

export const repoIcon = new LabIcon({
  name: 'repo',
  svgstr: repoSvgstr
});

export const sourceControlIcon = new LabIcon({
  name: 'source-control',
  svgstr: sourceControlSvgstr
});

export const codespaceNameIcon = new LabIcon({
  name: 'codespaceName',
  svgstr: tagSvgstr
});

export const machineIcon = new LabIcon({
  name: 'machine-details',
  svgstr: vmSvgstr
});

export const retentionIcon = new LabIcon({
  name: 'retention-period',
  svgstr: historySvgstr
});

export interface CodespaceData {
  codespace_name: string,
  repo_name: string,
  machine: string,
  git_ref: string,
  git_behind: string,
  git_ahead: string,
  idle_timeout_minutes: string,
  created_days_ago: string,
  retention_period_days: string
}

class CodespaceMenu extends ReactWidget {
    data: CodespaceData;
  
    constructor(jsonData: CodespaceData) {
      super();
      this.addClass('codespace-menu-box');
      this.id = '@jupyterlab-sidepanel/example';
      this.title.iconClass = "codespace-icon jp-SideBar-tabIcon";
      this.title.caption = "Codespace Panel";
      this.data = jsonData;
    }

    render(): JSX.Element {
      return <div>
        <span className="info-title">GITHUB CODESPACES</span>
        <div className="info-line">
            <repoIcon.react className="info-icon"/>
            <span>{this.data.repo_name}</span>
        </div>
        <div className="info-line">
            <codespaceNameIcon.react className="info-icon"/>
            <span>{this.data.codespace_name}</span>
        </div>
        <div className="info-line">
            <sourceControlIcon.react className="info-icon"/>
            <span>{this.data.git_ref} • {this.data.git_behind}↓ {this.data.git_ahead}↑</span>
        </div>
        <div className="info-line">
            <machineIcon.react className="info-icon"/>
            <span>{this.data.machine}</span>
        </div>
        <div className="info-line">
            <timeoutIcon.react className="info-icon"/>
            <span>Idle timeout {this.data.idle_timeout_minutes} minutes</span>
        </div>
        <div className="info-line">
            <createdIcon.react className="info-icon"/>
            <span>Created {this.data.created_days_ago} days ago</span>
        </div>
        <div className="info-line">
            <retentionIcon.react className="info-icon"/>
            <span>Retention period {this.data.retention_period_days} days</span>
        </div>
      </div>;
    }
}

export { CodespaceMenu };