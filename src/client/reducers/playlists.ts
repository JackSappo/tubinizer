export function playlists (state = [], action) {
  console.log('~= PL REDUCER RUNNING WITH ACTION', action)

  switch (action.type) {
    case 'RECEIVE_PLAYLISTS':
      return action.payload;
    default:
      return [];
  }
}