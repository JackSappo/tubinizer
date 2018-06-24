export function playlists (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_PLAYLISTS':
      return action.payload;
    default:
      return state;
  }
}