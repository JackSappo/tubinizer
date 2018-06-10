import * as React from 'react';
import { FavoriteItem } from './FavoriteItem';
import { PlaylistItem } from '../App';

export class FolderContents extends React.Component<Props, {}> {
  public render() {
    return this.props.items.map(item => <FavoriteItem item={item}/>)
  }
}

interface Props {
  items: PlaylistItem[];
}