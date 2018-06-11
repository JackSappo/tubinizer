import * as React from 'react';
import { Playlist } from './Playlist';

const playlistList = [
  {
    title: 'Funny'
  },
  {
    title: 'Music'
  },
  {
    title: 'Movies'
  },
  {
    title: 'Animals'
  }
]

export class PlaylistList extends React.Component {
  render() {
    return (
      <div id="sidebar">
        {playlistList.map(playlist => <Playlist playlist= {playlist} /> )}
      </div>
    )
  }
}