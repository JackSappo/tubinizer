export const REQUEST_PLAYLISTS = 'REQUEST_PLAYLISTS';
export const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';

export function fetchPlaylists (ytProxy) {
  console.log('~= FETCH PL ACTION')
  return async function (dispatch) {
    console.log('~= THUNKING')
    dispatch({
      type: REQUEST_PLAYLISTS,
    })

    return ytProxy.getPlaylists()
      .then(playlists => {
        dispatch({
          type: RECEIVE_PLAYLISTS,
          payload: playlists,
        })
      })
  }
}
