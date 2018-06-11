import * as React from 'react';
import { PlaylistMetadata } from '../App';

export class Playlist extends React.Component<Props, {}> {
  public render() {
    const { playlist } = this.props;
    return (
      <div className="fl-item">
        <i className="fl-icon fa fa-folder" /> <br/>
        <span className="fl-text">
          {playlist.snippet.title}
        </span>
      </div>
    )
  }
}

interface Props {
  playlist: PlaylistMetadata
}

interface Video {
  title: string;
}
