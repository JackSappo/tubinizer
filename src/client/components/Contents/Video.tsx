import * as React from 'react';
import { VideoMetadata } from '../../../types/YTMetadata';
import * as classnames from 'classnames';

export class Video extends React.Component<Props, {}> {
  public render() {
    const { item, selectedVideoId, selectVideo } = this.props;
    const className = classnames(
      'vl-item',
      { 'vl-item-selected': selectedVideoId === item.contentDetails.videoId }
    )

    return (
      <div
        className={className}
        onClick={() => selectVideo(item.contentDetails.videoId)}
      >
        {item.snippet.title}
      </div>
    )
  }
}

interface Props {
  item: VideoMetadata;
  selectedVideoId: string | null;
  selectVideo: (videoId: string) => void;
}