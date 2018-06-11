import * as React from 'react';
import * as axios from 'axios';
import { YT_CHANNELS_URL, YT_PLAYLISTITEMS_URL, YT_PLAYLISTS_URL } from '../../constants';
import { API_KEY, CHANNEL_ID } from '../../config';
import { VideoList } from './Contents/VideoList';
import { PlaylistList } from './Playlists/PlaylistList'
import { PlaylistMetadata, VideoMetadata } from '../../types/YTMetadata';
import './styles.css';

export class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      playlists: [],
      playlistItems: [],
    }

    this.getPlaylistItems = this.getPlaylistItems.bind(this);
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
        <PlaylistList playlists={this.state.playlists} getPlaylistItems={this.getPlaylistItems}/>
        <VideoList items={this.state.playlistItems}/>
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

  private async getPlaylistItems(playlistId: string, options: FetchPIOptions = {}): Promise<void> {
    console.log('~= GETTING FOR ID', playlistId)

    //TODO: axios type
    const { data } = await axios['get'](YT_PLAYLISTITEMS_URL, {
      params: {
        key: API_KEY,
        part: 'snippet,contentDetails',
        maxResults: options.maxResults || '20',
        playlistId
      }
    })

    console.log('~= DATA IS', data)

    this.setState({
      playlistItems: data.items
    })
  }
}

interface FetchPIOptions {
  maxResults?: string
}

interface State {
  isLoading: boolean;
  playlists: PlaylistMetadata[];
  playlistItems: VideoMetadata[];
}