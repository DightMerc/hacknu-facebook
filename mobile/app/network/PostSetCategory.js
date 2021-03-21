import SendRequest from './base.js'

import { AsyncStorage } from 'react-native';

export default async function PostSetCategory(guid, category){

        let url = `/${guid}/category/`
    
        let body = {
                  'category': category
            }
        
      return await SendRequest(url, 'POST', body=body)
    
    
}