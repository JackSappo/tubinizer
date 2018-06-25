import { YTProxy } from "../proxies/youtube";

export const REQUEST_PLAYLISTS = 'REQUEST_PLAYLISTS';
export const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';

type ThunkAction = (dispatch: any) => Promise<void>

export function fetchPlaylists (ytProxy: YTProxy): ThunkAction {
  return async function (dispatch) {
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
