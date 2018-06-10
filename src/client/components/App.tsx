import * as React from 'react';
import * as axios from 'axios';
import { YT_CHANNELS_URL, YT_PLAYLISTITEMS_URL } from '../../constants';
import { API_KEY, CHANNEL_ID } from '../../config';
import { FolderContents } from './Contents/FolderContents';
import { FolderList } from './Folders/FolderList'
import './styles.css';

export class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      favorites: []
    }
  }

  public async componentDidMount() {
    //TYPES & ASYNC AWAIT
    const playlistId = await this.getPlaylistId('favorites');
    const favorites = await this.getFavoritesItems(playlistId);
    this.setState({
      favorites,
      isLoading: false,
    })
  }

  public render() {
    if (this.state.isLoading) {
      return <div>Sup I'm loading</div>
    }
    return (
      <div id="app-container">
        <FolderList />
        <FolderContents items={this.state.favorites}/>
      </div>
    )
  }

  private async getPlaylistId(type: 'favorites' | 'uploads'): Promise<string> {
    //TODO: axios type
    const { data } = await axios['get'](YT_CHANNELS_URL, {
      params: {
        key: API_KEY,
        part: 'contentDetails',
        id: CHANNEL_ID
      }
    });

    console.log('~= RESPONSE IS', data)

    if (data.pageInfo.totalResults === 0) {
      throw new Error('No channels found with provided ID')
    } else if (data.pageInfo.totalResults !== 1) {
      throw new Error ('Found more than 1 channel with provided ID')
    }

    return data.items[0].contentDetails.relatedPlaylists[type];
  }

  private async getFavoritesItems(playlistId: string, options: FavoritesOptions = {}): Promise<PlaylistItem[]> {
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

export interface PlaylistItem {
  kind: 'youtube#playlistItem';
  etag: string;
  id: string;
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

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface State {
  isLoading: boolean;
  favorites: PlaylistItem[];
}