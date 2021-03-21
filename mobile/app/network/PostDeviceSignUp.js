import SendRequest from './base.js'


export default async function PostDeviceSignUp(){
    let url = '/devices/'

    let body = {
            'device_type': Platform.OS
        }
    

    return await SendRequest(url, 'POST', body=body)
}