import * as React from 'react';
import { Playlist } from './Playlist';
import { PlaylistMetadata } from '../App';

// const playlistList = [
//   {
//     title: 'Funny'
//   },
//   {
//     title: 'Music'
//   },
//   {
//     title: 'Movies'
//   },
//   {
//     title: 'Animals'
//   }
// ]

export class PlaylistList extends React.Component<Props, {}> {
  render() {
    const { playlists } = this.props;
    return (
      <div id="sidebar">
        {playlists.map(playlist => <Playlist playlist= {playlist} /> )}
      </div>
    )
  }
}

interface Props {
  playlists: PlaylistMetadata[]
}
