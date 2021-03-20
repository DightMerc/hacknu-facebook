import SendRequest from './base.js'

import { AsyncStorage } from 'react-native';

export default async function PostUserCreation(guid, phone, firstname){

        let url = `/${guid}/user/`
    
        let body = {
                  'language': 'en',
                  'phone': phone,
                  'firstname': firstname,
                  'surname': ''
            }
        
      return await SendRequest(url, 'POST', body=body)
    
    
}