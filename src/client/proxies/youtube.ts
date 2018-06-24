import { API_KEY, CLIENT_ID } from '../../config';
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
          console.log('~= ONSUCCESS IS', onSuccess)
          if (onSuccess) onSuccess()
        }))
        .catch(err => {
          console.error('~= SIGNIN FAILED', err)
          if (onFail) onFail()
        })
    };

    document.body.appendChild(script);
  }

  public async getPlaylists(): Promise<PlaylistMetadata[]> {
    console.log('~= PROXY GETTING PLAYLISTS')
    const res = await this.ytClient.playlists.list({
      part: 'snippet',
      maxResults: '20',
      mine: true,
    })

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
    return this.ytClient.playlistItems.insert({
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
    return this.ytClient.playlistItems.delete({
      id: videoId
    })
  }

  public async moveVideo(videoId: string, idInPlaylist: string, oldPlaylistId: string, newPlaylistId: string): Promise<boolean> {
    await this.addVideo(videoId, newPlaylistId);
    await this.removeVideo(idInPlaylist, oldPlaylistId)

    return Promise.resolve(true);

    // TODO: If remove unsuccessful, undo the add
  }
}

export interface FetchPIOptions {
  maxResults?: string
  force?: boolean
}