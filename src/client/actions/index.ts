export function getPlaylists (ytProxy) {
  console.log('~= DISPATCHING ACTION')
  return {
    type: 'GET_PLAYLISTS',
    payload: ytProxy.getPlaylists(),
  }
}