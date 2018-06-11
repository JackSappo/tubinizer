import * as React from 'react';
import * as axios from 'axios';
import { YT_CHANNELS_URL, YT_PLAYLISTITEMS_URL, YT_PLAYLISTS_URL } from '../../constants';
import { API_KEY, CHANNEL_ID } from '../../config';
import { PlaylistContents } from './Contents/PlaylistContents';
import { PlaylistList } from './Playlists/PlaylistList'
import './styles.css';

export class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      playlists: [],
    }
  }

  public async componentDidMount() {
    const playlists = await this.getPlaylists();
    console.log('~= PLAYLISTS ARE', playlists);
    this.setState({
      playlists,
      isLoading: false,
    })
  }

  public render() {
    if (this.state.isLoading) {
      return <div>Sup I'm loading</div>
    }
    return (
      <div id="app-container">
        <PlaylistList playlists={this.state.playlists}/>
        <PlaylistContents items={[]}/>
      </div>
    )
  }

  private async getPlaylists(): Promise<PlaylistMetadata[]> {
    //TODO: axios type
    const { data } = await axios['get'](YT_PLAYLISTS_URL, {
      params: {
        key: API_KEY,
        part: 'snippet,contentDetails',
        maxResults: '20',
        channelId: CHANNEL_ID,
      }
    })

    return data.items;
  }

  private async getFavoritesItems(playlistId: string, options: FavoritesOptions = {}): Promise<VideoMetadata[]> {
    const { data } = await axios['get'](YT_PLAYLISTITEMS_URL, {
      params: {
        key: API_KEY,
        part: 'snippet,contentDetails',
        maxResults: options.maxResults || '5',
        playlistId
      }
    })

    return data.items;
  }
}

interface FavoritesOptions {
  maxResults?: string
}

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
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface State {
  isLoading: boolean;
  playlists: PlaylistMetadata[];
  // favorites: VideoMetadata[];
}