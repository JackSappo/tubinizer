import * as React from 'react';
import { Video } from './Video';
import { VideoMetadata } from '../App';

export class PlaylistContents extends React.Component<Props, {}> {
  public render() {
    return (
      <div id="folder-contents">
        {this.props.items.map(item => <Video item={item}/>)}
      </div>
    )
  }
}

interface Props {
  items: VideoMetadata[];
}