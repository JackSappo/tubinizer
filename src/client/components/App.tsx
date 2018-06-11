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
      selectedPlaylistId: null,
      playlistItems: [],
      selectedVideoId: null,
    }

    this.getPlaylistItems = this.getPlaylistItems.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
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
        <PlaylistList 
          playlists={this.state.playlists} 
          selectedPlaylistId={this.state.selectedPlaylistId}
          getPlaylistItems={this.getPlaylistItems}
        />
        <VideoList 
          items={this.state.playlistItems}
          selectedVideoId={this.state.selectedVideoId}
          selectVideo={this.selectVideo}
        />
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

    if (this.state.selectedPlaylistId === playlistId) {
      return;
    }

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
      playlistItems: data.items,
      selectedPlaylistId: playlistId,
      selectedVideoId: null,
    })
  }

  private selectVideo(videoId: string): void {
    if (this.state.selectedVideoId === videoId) {
      return this.setState({
        selectedVideoId: null,
      })
    }

    this.setState({
      selectedVideoId: videoId,
    })
  }

  private moveVideo(playlistId) {

  }
}

interface FetchPIOptions {
  maxResults?: string
}

interface State {
  isLoading: boolean;
  playlists: PlaylistMetadata[];
  selectedPlaylistId: string | null;
  playlistItems: VideoMetadata[];
  selectedVideoId: string | null;
}