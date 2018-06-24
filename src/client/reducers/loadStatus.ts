export function isLoading(state = false, action) {
  console.log('~= LOADING REDUCER RUNNING WITH ACTION', action)

  switch(action.type) {
    case 'REQUEST_PLAYLISTS':
      return true;
    case 'RECEIVE_PLAYLISTS':
      return false;
    default: return state;
  }
}