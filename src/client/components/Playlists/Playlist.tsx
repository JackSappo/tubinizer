import * as React from 'react';
import * as classnames from 'classnames';
import { PlaylistMetadata } from '../../../types/YTMetadata';

export class Playlist extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
    this.selectPlaylist = this.selectPlaylist.bind(this);
  }

  private selectPlaylist() {
    this.props.getPlaylistItems(this.props.playlist.id)
  }

  public render() {
    const { playlist, selectedPlaylistId } = this.props;
    const isSelected = selectedPlaylistId === playlist.id;

    const className = classnames(
      'pl-item',
      { 'pl-item-selected': isSelected }
    )
    const faClass = classnames(
      'pl-icon',
      'fa',
      isSelected ? 'fa-folder-open' : 'fa-folder'
    )

    return (
      <div className={className} onClick={this.selectPlaylist}>
        <i className={faClass} />
        <br/>
        <span className="pl-text">
          {playlist.snippet.title}
        </span>
      </div>
    )
  }
}

interface Props {
  playlist: PlaylistMetadata
  selectedPlaylistId: string;
  getPlaylistItems: (playlistId: string, options?: object) => Promise<void>
}

interface Video {
  title: string;
}
