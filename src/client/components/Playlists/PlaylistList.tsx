import * as React from 'react';
import { Playlist } from './Playlist';
import { PlaylistMetadata } from '../../../types/YTMetadata';

export class PlaylistList extends React.Component<Props, {}> {
  render() {
    const { playlists, selectedPlaylistId, getPlaylistItems } = this.props;
    return (
      <div id="sidebar">
        {playlists.map(playlist => 
          <Playlist 
            playlist={playlist}
            selectedPlaylistId={selectedPlaylistId}
            getPlaylistItems={getPlaylistItems}
          /> 
        )}
      </div>
    )
  }
}

interface Props {
  playlists: PlaylistMetadata[];
  selectedPlaylistId: string;
  getPlaylistItems: (playlistId: string, options?: object) => Promise<void>;
}
