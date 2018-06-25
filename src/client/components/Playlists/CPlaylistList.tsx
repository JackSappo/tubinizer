import * as React from 'react';
import { connect } from 'react-redux';
import { PlaylistList } from './PlaylistList';
import { fetchPlaylists } from '../../actions';

class CPlaylistList extends React.Component<any,any> {
  componentDidMount() {
    this.props.fetchPlaylists(this.props.ytProxy);
  }

  render() {
    if (this.props.isLoading) {
      return <div>Loading playlists</div>
    }
    return <PlaylistList 
      playlists={this.props.playlists}
      selectedPlaylistId={this.props.selectedPlaylistId}
      selectedVideoId={this.props.selectedVideoId}
      getPlaylistItems={this.props.getPlaylistItems}
      moveVideo={this.props.moveVideo}
    />
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists,
  isLoading: state.isLoading,
})

const mapDispatchToProps = dispatch => ({
  fetchPlaylists: (ytProxy) => dispatch(fetchPlaylists(ytProxy))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CPlaylistList)