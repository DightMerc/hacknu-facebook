import SendRequest from './base.js'

import { AsyncStorage } from 'react-native';

export default async function PostSetLocation(guid, location){

        let url = `/${guid}/user/location/`
    
        let body = {
                'location': location
            }
        
      return await SendRequest(url, 'POST', body=body)
    
    
}