import { combineReducers } from 'redux';
import { playlists } from './playlists';
import { isLoading } from './loadStatus';

export default combineReducers({
  playlists,
  isLoading
})