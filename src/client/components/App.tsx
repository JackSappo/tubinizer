import * as React from 'react';
import * as axios from 'axios';
import { YT_CHANNELS_URL } from '../../constants';
import { API_KEY, CHANNEL_ID } from '../../config';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      favorites: []
    }
  }

  public async componentDidMount() {
    //TYPES & ASYNC AWAIT
    const playlistId = await this.getPlaylistId('favorites');

    console.log('~= FAVORITES PLAYLIST ID IS', playlistId)
  }

  public render() {
    console.log()
    return (
      <div>Sup I'm a classy dom</div>
    )
  }

  private async getPlaylistId(type: 'favorites' | 'uploads') {
    //TODO: axios type
    const { data } = await axios['get'](YT_CHANNELS_URL, {
      params: {
        part: 'contentDetails',
        key: API_KEY,
        id: CHANNEL_ID
      }
    });

    console.log('~= RESPONSE IS', data)

    if (data.pageInfo.totalResults === 0) {
      throw new Error('No channels found with provided ID')
    } else if (data.pageInfo.totalResults !== 1) {
      throw new Error ('Found more than 1 channel with provided ID')
    }

    return data.items[0].contentDetails.relatedPlaylists[type];
  }
}