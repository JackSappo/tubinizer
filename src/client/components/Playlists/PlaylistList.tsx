import * as React from 'react';
import { Playlist } from './Playlist';
import { PlaylistMetadata } from '../../../types/YTMetadata';

export class PlaylistList extends React.Component<Props, {}> {
  render() {
    const { playlists, getPlaylistItems } = this.props;
    return (
      <div id="sidebar">
        {playlists.map(playlist => <Playlist playlist={playlist} getPlaylistItems={getPlaylistItems}/> )}
      </div>
    )
  }
}

interface Props {
  playlists: PlaylistMetadata[];
  getPlaylistItems: (playlistId: string, options?: object) => Promise<void>;
}
