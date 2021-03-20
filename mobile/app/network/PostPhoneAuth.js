import SendRequest from './base.js'

import { AsyncStorage } from 'react-native';

export default async function PostDeviceSignUp(guid, phone){

        let url = `/${guid}/auth/phone/`
    
        let body = {
                'phone': phone
            }
        
      return await SendRequest(url, 'POST', body=body)
    
    
}