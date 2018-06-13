import * as React from 'react';
import * as axios from 'axios';
import { API_KEY, CHANNEL_ID } from '../../config';
import { VideoList } from './Contents/VideoList';
import { PlaylistList } from './Playlists/PlaylistList'
import { PlaylistMetadata, VideoMetadata } from '../../types/YTMetadata';
import { YTProxy, FetchPIOptions } from '../proxies/youtube';
import './styles.css';
import { YT_PLAYLISTITEMS_URL } from '../../constants';

export class App extends React.Component<{}, State> {
  private ytProxy: YTProxy;

  
  constructor(props) {
    // console.log('~= GAPI IS', gapi)
    super(props);
    this.state = {
      isLoading: true,
      playlists: [],
      selectedPlaylistId: null,
      playlistItems: [],
      selectedVideoId: null,
    }

    this.ytProxy = new YTProxy();

    this.getPlaylistItems = this.getPlaylistItems.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.moveVideo = this.moveVideo.bind(this);
  }

  public async componentDidMount() {
    this.ytProxy.init();

    const playlists = await this.ytProxy.getPlaylists();
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
          selectedVideoId={this.state.selectedVideoId}
          getPlaylistItems={this.getPlaylistItems}
          moveVideo={this.moveVideo}
        />
        <VideoList 
          items={this.state.playlistItems}
          selectedVideoId={this.state.selectedVideoId}
          selectVideo={this.selectVideo}
        />
      </div>
    )
  }

  private selectVideo(videoId: string): void {
    const newVideoSelected = this.state.selectedVideoId !== videoId;

    this.setState({
      selectedVideoId: newVideoSelected ? videoId : null
    })
  }

  private async getPlaylists(): Promise<PlaylistMetadata[]> {
    return await this.ytProxy.getPlaylists();
  }

  private async getPlaylistItems(playlistId: string, options: FetchPIOptions = {}): Promise<void> {
    console.log('~= GETTING FOR ID', playlistId)

    if (this.state.selectedPlaylistId === playlistId) {
      return;
    }

    const playlistItems = await this.ytProxy.getPlaylistItems(playlistId, options);

    this.setState({
      playlistItems,
      selectedPlaylistId: playlistId,
      selectedVideoId: null,
    })
  }

  private moveVideo(videoId: string, oldPlaylistId: string, newPlaylistId: string): void {
    console.log(`~= MOVING VID ${videoId} FROM PL ${oldPlaylistId} TO PL ${newPlaylistId}`)
    // Add video to other playlist
    this.ytProxy.addVideo(videoId, newPlaylistId);

    // If successful, remove video from OG playlist
      // Q: How do we know ID of old playlist? I guess it's what's currently selected

    // If remove unsuccessful, remove from new playlist

    // Deselect
  }

}

interface State {
  isLoading: boolean;
  playlists: PlaylistMetadata[];
  selectedPlaylistId: string | null;
  playlistItems: VideoMetadata[];
  selectedVideoId: string | null;
}