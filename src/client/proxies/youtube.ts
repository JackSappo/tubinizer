import * as axios from 'axios';
import { YT_CHANNELS_URL, YT_PLAYLISTITEMS_URL, YT_PLAYLISTS_URL } from '../../constants';
import { API_KEY, CHANNEL_ID, CLIENT_ID } from '../../config';
import { PlaylistMetadata, VideoMetadata } from '../../types/YTMetadata';

export class YTProxy {
  private googleAuth;
  private gapi;
  private ytClient;

  public init(onSuccess?, onFail?) {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = async () => {
      //TODO: Fix type, but may be crazy
      this.gapi = window['gapi']
      await new Promise((resolve, reject) => {
        this.gapi.load('client', () => resolve())
      })

      await this.gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': 'https://www.googleapis.com/auth/youtube',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
      })

      this.ytClient = this.gapi.client.youtube;
      this.googleAuth = this.gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes. Doesn't seem to trigger
      this.googleAuth.isSignedIn.listen(isSignedIn => {
        console.log('~= SIGNIN STATUS CHANGED TO', isSignedIn)
      });

      //This is what actually triggers the window, so would be triggered by a login or whatever
      this.googleAuth.signIn()
        .then((() => {
          console.log('~= SIGNIN SUCCESSFUL')
          if (onSuccess) onSuccess()
        }))
        .catch(err => {
          console.error('~= SIGNIN FAILED', err)
          if (onFail) onFail()
        })
    };

    console.log('~= APPENDING')
    document.body.appendChild(script);
    console.log('~= APPENDED')
  }

  public async getPlaylists(): Promise<PlaylistMetadata[]> {
    const res = await this.ytClient.playlists.list({
      part: 'snippet',
      maxResults: '20',
      mine: true,
    })

    console.log('~= PL RES', res);

    return res.result.items;
  }

  public async getPlaylistItems(playlistId: string, options: FetchPIOptions = {}): Promise<VideoMetadata[]> {
    const res = await this.ytClient.playlistItems.list({
      part: 'snippet,contentDetails',
      maxResults: options.maxResults || '20',
      playlistId
    });

    return res.result.items;
  }

  public addVideo(videoId: string, playlistId: string) {
    console.log('~= ADDING')
    return this.ytClient.playlistItems.insert({
      // key: API_KEY,
      part: 'snippet',
      resource: {
        snippet: {
          playlistId,
          resourceId: {
            kind: 'youtube#video',
            videoId
          }
        }
      }
    })
  }

  public removeVideo(videoId: string, playlistId: string) {
    console.log('~= REMOVING')
    return this.ytClient.playlistItems.delete({
      id: videoId
    })
  }

  public async moveVideo(videoId: string, idInPlaylist: string, oldPlaylistId: string, newPlaylistId: string): Promise<void> {
    console.log(`~= MOVING VID ${videoId} / ${idInPlaylist} FROM PL ${oldPlaylistId} TO PL ${newPlaylistId}`)

    const addRes = await this.addVideo(videoId, newPlaylistId);
    console.log('~= ADDRES', addRes)

    const remRes = await this.removeVideo(idInPlaylist, oldPlaylistId)

    console.log('~= REMRES', remRes)

    // TODO: If remove unsuccessful, remove from new playlist

    // TODO: Deselect & refresh
  }
}

export interface FetchPIOptions {
  maxResults?: string
}