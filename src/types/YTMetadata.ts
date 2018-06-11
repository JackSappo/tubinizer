interface YTMetadata {
  kind: 'youtube#playlistItem';
  etag: string;
  id: string;
}

export interface VideoMetadata extends YTMetadata {
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
      standard: Thumbnail;
      maxres: Thumbnail;
    }
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: any;
  }
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
  }
}

export interface PlaylistMetadata extends YTMetadata {
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
    }
    channelTitle: string;
    localized: string;
  }
  contentDetails: {
    itemCount: number;
  }
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}