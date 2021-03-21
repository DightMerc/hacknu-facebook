import SendRequest from './base.js'


export default async function GetUser(GUID){
    let url = `/${GUID}/user/`

    return await SendRequest(url, 'GET')
}