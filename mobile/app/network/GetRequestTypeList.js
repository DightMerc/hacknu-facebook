import SendRequest from './base.js'


export default async function GetRequestTypeList(){
    let url = '/download/RequestType'

    return await SendRequest(url, 'GET')
}