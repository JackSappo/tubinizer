export function isLoading(state = false, action) {
  switch(action.type) {
    case 'REQUEST_PLAYLISTS':
      return true;
    case 'RECEIVE_PLAYLISTS':
      return false;
    default: 
      return state;
  }
}