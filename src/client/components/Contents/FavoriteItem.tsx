import * as React from 'react';
import { PlaylistItem } from '../App';


export class FavoriteItem extends React.Component<Props, {}> {
  public render() {
    const { item } = this.props;

    return (
      <div>
        {item.snippet.title}
      </div>
    )
  }
}

interface Props {
  item: PlaylistItem
}