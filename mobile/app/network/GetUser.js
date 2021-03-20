import SendRequest from './base.js'


export default async function GetSetPending(GUID){
    let url = `/${GUID}/user/`

    return await SendRequest(url, 'GET')
}