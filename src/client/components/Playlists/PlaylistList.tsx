import * as React from 'react';
import { Playlist } from './Playlist';
import { PlaylistMetadata } from '../../../types/YTMetadata';

export class PlaylistList extends React.Component<Props, {}> {
  render() {
    const { playlists } = this.props;
    return (
      <div id="sidebar">
        {playlists.map(playlist => 
          <Playlist 
            playlist={playlist}
            {...this.props}
          /> 
        )}
      </div>
    )
  }
}

interface Props {
  playlists: PlaylistMetadata[];
  selectedPlaylistId: string;
  selectedVideoId: string;
  getPlaylistItems: (playlistId: string, options?: object) => Promise<void>;
  moveVideo: (newPlaylistId: string) => void;
}
