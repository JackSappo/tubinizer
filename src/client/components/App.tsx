import * as React from 'react';
import { connect } from 'react-redux';
import { VideoList } from './Contents/VideoList';
import { PlaylistList } from './Playlists/PlaylistList'
import { PlaylistMetadata, VideoMetadata } from '../../types/YTMetadata';
import { YTProxy, FetchPIOptions } from '../proxies/youtube';
import { fetchPlaylists, signIn } from '../actions'
import './styles.css';
import CPlaylistList from './Playlists/CPlaylistList';

const ytProxy = new YTProxy();

class App extends React.Component<Props,State> {
  private ytProxy: YTProxy;
  
  constructor(props) {
    super(props);
    this.state = {
      selectedPlaylistId: null,
      playlistItems: [],
      selectedVideoId: null,
      idInPlaylist: null,
    }

    this.ytProxy = ytProxy;

    this.getPlaylistItems = this.getPlaylistItems.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.moveVideo = this.moveVideo.bind(this);
  }

  public async componentDidMount() {
    this.ytProxy.init(this.props.signIn);
  }

  public render() {
    if (!this.props.authed) {
      return <div>Sup I'm loading</div>
    }
    return (
      <div id="app-container">
        <CPlaylistList 
          ytProxy={this.ytProxy}
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
  playlists: state.playlists,
  isLoading: state.isLoading,
  authed: state.authed,
})

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(signIn()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

interface Props {
  playlists: PlaylistMetadata[];
  signIn: () => void,
  authed: boolean;
}

interface State {
  selectedPlaylistId: string | null;
  playlistItems: VideoMetadata[];
  selectedVideoId: string | null;
  idInPlaylist: string | null;
}