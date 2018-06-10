import * as React from 'react';

export class FolderItem extends React.Component<Props, {}> {
  public render() {
    const { folder } = this.props;
    return (
      <div className="fl-item">
        <i className="fl-icon fa fa-folder" /> <br/>
        <span className="fl-text">
          {folder.title}
        </span>
      </div>
    )
  }
}

interface Props {
  folder: TFolderItem
}

interface TFolderItem {
  title: string;
}
