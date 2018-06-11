import * as React from 'react';
import { VideoMetadata } from '../../../types/YTMetadata';

export class Video extends React.Component<Props, {}> {
  public render() {
    const { item } = this.props;

    return (
      <div className="item">
        {item.snippet.title}
      </div>
    )
  }
}

interface Props {
  item: VideoMetadata
}