import * as React from 'react';
import { PlaylistMetadata } from '../App';

export class Playlist extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
    this.selectPlaylist = this.selectPlaylist.bind(this);
  }

  private selectPlaylist() {
    this.props.getPlaylistItems(this.props.playlist.id)
  }

  public render() {
    const { playlist } = this.props;
    return (
      <div className="fl-item" onClick={this.selectPlaylist}>
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
  getPlaylistItems: (playlistId: string, options?: object) => Promise<void>
}

interface Video {
  title: string;
}
