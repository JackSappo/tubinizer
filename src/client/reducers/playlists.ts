export default function playlists (state = [], action) {
  console.log('~= REDUCER RUNNING WITH ACTION', action)

  switch (action.type) {
    case 'GET_PLAYLISTS':
      return action.payload;
    default:
      return [];
  }
}