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
    const { playlist, selectedVideoId, selectedPlaylistId, moveVideo } = this.props;
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

    const renderMover = () => selectedVideoId 
      ? (
        <span 
          className="pl-mover"
          onClick={() => moveVideo(selectedVideoId, selectedPlaylistId, playlist.id)}
        >
          <i className="fa fa-arrow-alt-circle-left" />
        </span>
      ) : null;

    

    return (
      <div className={className}>
        <i className={faClass} onClick={this.selectPlaylist} />
        { renderMover() }
        <br/>
        <span className="pl-text" onClick={this.selectPlaylist}>
          {playlist.snippet.title}
        </span>
      </div>
    )
  }
}

interface Props {
  playlist: PlaylistMetadata
  selectedPlaylistId: string;
  selectedVideoId: string;
  getPlaylistItems: (playlistId: string, options?: object) => Promise<void>
  moveVideo: (videoId: string, oldPlaylistId: string, newPlaylistId: string) => void;
}

interface Video {
  title: string;
}
