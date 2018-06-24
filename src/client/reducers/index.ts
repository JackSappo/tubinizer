import { combineReducers } from 'redux';
import playlists from './playlists';

export default combineReducers({
  reduxPlaylists: playlists
})