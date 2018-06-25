import { combineReducers } from 'redux';
import { playlists } from './playlists';
import { isLoading } from './loadStatus';
import { authed } from './auth';

export default combineReducers({
  playlists,
  isLoading,
  authed
})