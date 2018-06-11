import * as React from 'react';
import { VideoMetadata } from '../App';


export class Video extends React.Component<Props, {}> {
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
  item: VideoMetadata
}