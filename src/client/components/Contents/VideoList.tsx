import * as React from 'react';
import { Video } from './Video';
import { VideoMetadata } from '../../../types/YTMetadata';

export class VideoList extends React.Component<Props, {}> {
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