import * as axios from 'axios';
import { YT_CHANNELS_URL, YT_PLAYLISTITEMS_URL, YT_PLAYLISTS_URL } from '../../constants';
import { API_KEY, CHANNEL_ID, CLIENT_ID } from '../../config';
import { PlaylistMetadata, VideoMetadata } from '../../types/YTMetadata';

export class YTProxy {
  public init() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = async () => {
      //TODO: Fix type, but may be crazy
      const gapi = window['gapi']
      await new Promise((resolve, reject) => {
        gapi.load('client', () => resolve())
      })

      console.log('~= WINDOW GAPI IS', gapi)
      console.log('~= CLIENT IS', gapi.client)
      await gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': 'https://www.googleapis.com/auth/youtube',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
      })

      console.log('~= CLIENT INITIALIZED')

      const GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      console.log('~= LISTENING')
      GoogleAuth.isSignedIn.listen();
      // GoogleAuth.isSignedIn.listen(updateSigninStatus);
    };

    document.body.appendChild(script);
  }

  public async getPlaylists(): Promise<PlaylistMetadata[]> {
    //TODO: axios type
    const { data } = await axios['get'](YT_PLAYLISTS_URL, {
      params: {
        key: API_KEY,
        part: 'snippet,contentDetails',
        maxResults: '20',
        channelId: CHANNEL_ID,
      }
    })
    
    return data.items;
  }

  public async getPlaylistItems(playlistId: string, options: FetchPIOptions = {}): Promise<VideoMetadata[]> {
    // console.log('~= GETTING FOR ID', playlistId)

    // if (this.state.selectedPlaylistId === playlistId) {
    //   return;
    // }

    //TODO: axios type
    const { data } = await axios['get'](YT_PLAYLISTITEMS_URL, {
      params: {
        key: API_KEY,
        part: 'snippet,contentDetails',
        maxResults: options.maxResults || '20',
        playlistId
      }
    })

    console.log('~= DATA IS', data)

    return data.items;

    // this.setState({
    //   playlistItems: data.items,
    //   selectedPlaylistId: playlistId,
    //   selectedVideoId: null,
    // })
  }

  public async addVideo(videoId: string, playlistId: string) {
    const res = await axios['post'](YT_PLAYLISTITEMS_URL, {
      snippet: {
        playlistId,
        resourceId: {
          kind: 'youtube#video',
          videoId
        }
      }
    }, {
      params: {
        key: API_KEY,
        part: 'snippet'
      }
    })
  }

  public moveVideo(videoId: string, oldPlaylistId: string, newPlaylistId: string): void {
    console.log(`~= MOVING VID ${videoId} FROM PL ${oldPlaylistId} TO PL ${newPlaylistId}`)
    // Add video to other playlist

    // If successful, remove video from OG playlist
      // Q: How do we know ID of old playlist? I guess it's what's currently selected

    // If remove unsuccessful, remove from new playlist

    // Deselect
  }
}

export interface FetchPIOptions {
  maxResults?: string
}