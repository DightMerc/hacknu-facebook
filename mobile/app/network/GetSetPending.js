import SendRequest from './base.js'


export default async function GetSetPending(GUID){
    let url = `/${GUID}/user/pending/`

    return await SendRequest(url, 'GET')
}