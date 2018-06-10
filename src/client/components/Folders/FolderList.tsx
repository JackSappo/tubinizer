import * as React from 'react';
import { FolderItem } from './FolderItem';

const folderList = [
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

export class FolderList extends React.Component {
  render() {
    return (
      <div id="sidebar">
        {folderList.map(folder => <FolderItem folder= {folder} /> )}
      </div>
    )
  }
}