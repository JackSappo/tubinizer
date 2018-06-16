import * as React from 'react';
import { VideoList } from './Contents/VideoList';
import { PlaylistList } from './Playlists/PlaylistList'
import { PlaylistMetadata, VideoMetadata } from '../../types/YTMetadata';
import { YTProxy, FetchPIOptions } from '../proxies/youtube';
import './styles.css';

export class App extends React.Component<{}, State> {
  private ytProxy: YTProxy;
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      playlists: [],
      selectedPlaylistId: null,
      playlistItems: [],
      selectedVideoId: null,
      idInPlaylist: null,
    }

    this.ytProxy = new YTProxy();

    this.getPlaylists = this.getPlaylists.bind(this);
    this.getPlaylistItems = this.getPlaylistItems.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.moveVideo = this.moveVideo.bind(this);
  }

  public async componentDidMount() {
    this.ytProxy.init(this.getPlaylists);
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

  private selectVideo(videoId: string, idInPlaylist: string): void {
    const newVideoSelected = this.state.selectedVideoId !== videoId;

    this.setState({
      selectedVideoId: newVideoSelected ? videoId : null,
      idInPlaylist: newVideoSelected ? idInPlaylist: null,
    })
  }

  private async getPlaylists(): Promise<void> {
    const playlists = await this.ytProxy.getPlaylists();

    this.setState({
      playlists,
      isLoading: false
    })
  }

  private async getPlaylistItems(playlistId: string, options: FetchPIOptions = {}): Promise<void> {
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

  //TODO: Should be able to get everything from state excepted newPlaylistId
  private moveVideo(videoId: string, oldPlaylistId: string, newPlaylistId: string): void {
    this.ytProxy.moveVideo(videoId, this.state.idInPlaylist, oldPlaylistId, newPlaylistId)
  }
}

interface State {
  isLoading: boolean;
  playlists: PlaylistMetadata[];
  selectedPlaylistId: string | null;
  playlistItems: VideoMetadata[];
  selectedVideoId: string | null;
  idInPlaylist: string | null;
}