import SendRequest from './base.js'

import { AsyncStorage } from 'react-native';

export default async function PostCodeCheck(guid, phone){

        let url = `/${guid}/auth/phone/check/`
    
        let body = {
                'code': phone
            }
        
      return await SendRequest(url, 'POST', body=body)
    
    
}