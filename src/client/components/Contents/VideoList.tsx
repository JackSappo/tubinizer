import * as React from 'react';
import { Video } from './Video';
import { VideoMetadata } from '../../../types/YTMetadata';

export class VideoList extends React.Component<Props, {}> {
  public render() {
    return (
      <div id="vl">
        {this.props.items.map(item => 
          <Video 
            item={item}
            selectedVideoId={this.props.selectedVideoId}
            selectVideo={this.props.selectVideo}
          />
        )}
      </div>
    )
  }
}

interface Props {
  items: VideoMetadata[];
  selectedVideoId: string | null;
  selectVideo: (videoId: string) => void;
}