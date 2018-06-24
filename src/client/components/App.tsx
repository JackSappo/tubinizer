import * as React from 'react';
import { connect } from 'react-redux';
import { VideoList } from './Contents/VideoList';
import { PlaylistList } from './Playlists/PlaylistList'
import { PlaylistMetadata, VideoMetadata } from '../../types/YTMetadata';
import { YTProxy, FetchPIOptions } from '../proxies/youtube';
import { fetchPlaylists } from '../actions'
import './styles.css';

const ytProxy = new YTProxy();

class App extends React.Component<any,any> {
  private ytProxy: YTProxy;
  
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: true,
      playlists: [],
      selectedPlaylistId: null,
      playlistItems: [],
      selectedVideoId: null,
      idInPlaylist: null,
    }

    this.ytProxy = ytProxy;

    this.getPlaylists = this.getPlaylists.bind(this);
    this.getPlaylistItems = this.getPlaylistItems.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.moveVideo = this.moveVideo.bind(this);
  }

  public async componentDidMount() {
    this.ytProxy.init(this.props.fetchPlaylists);
  }

  public render() {
    console.log('~= PROPS REDUXPLAYLISTS', this.props.reduxPlaylists)
    if (this.props.isLoading) {
      return <div>Sup I'm loading</div>
    }
    return (
      <div id="app-container">
        <PlaylistList 
          playlists={this.props.reduxPlaylists} 
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
    if (this.state.selectedPlaylistId === playlistId && !options.force) {
      return;
    }

    const playlistItems = await this.ytProxy.getPlaylistItems(playlistId, options);

    this.setState({
      playlistItems,
      selectedPlaylistId: playlistId,
      selectedVideoId: null,
    })
  }

  private async moveVideo(newPlaylistId: string): Promise<void> {
    const { selectedVideoId, idInPlaylist, selectedPlaylistId } = this.state;

    await this.ytProxy.moveVideo(
      selectedVideoId,
      idInPlaylist,
      selectedPlaylistId,
      newPlaylistId
    )

    this.getPlaylistItems(selectedPlaylistId, { force: true });
  }
}

const mapStateToProps = state => ({
  reduxPlaylists: state.reduxPlaylists,
  isLoading: state.isLoading,
})

const mapDispatchToProps = dispatch => ({
  fetchPlaylists: () => dispatch(fetchPlaylists(ytProxy))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

interface State {
  isLoading: boolean;
  playlists: PlaylistMetadata[];
  selectedPlaylistId: string | null;
  playlistItems: VideoMetadata[];
  selectedVideoId: string | null;
  idInPlaylist: string | null;
}