import * as React from 'react';

export class Playlist extends React.Component<Props, {}> {
  public render() {
    const { playlist } = this.props;
    return (
      <div className="fl-item">
        <i className="fl-icon fa fa-folder" /> <br/>
        <span className="fl-text">
          {playlist.title}
        </span>
      </div>
    )
  }
}

interface Props {
  playlist: Video
}

interface Video {
  title: string;
}
