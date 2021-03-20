import SendRequest from './base.js'


export default async function GetSetPending(GUID){
    let url = `/${GUID}/user/penging/`

    return await SendRequest(url, 'GET')
}