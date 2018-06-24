// export function getPlaylists (ytProxy) {
//   console.log('~= DISPATCHING ACTION')
//   return {
//     type: 'GET_PLAYLISTS',
//     payload: ytProxy.getPlaylists(),
//   }
// }

export function getPlaylists (ytProxy) {
  console.log('~= DISPATCHING ACTION')
  return function (dispatch) {
    console.log('~= THUNKIN')
    return ytProxy.getPlaylists()
      .then(playlists => {
        dispatch({
          type: 'GET_PLAYLISTS',
          payload: playlists,
        })
      })
  }
}
