import SendRequest from './base.js'


export default async function GetRequestList(Number=null){
    let url = '/download/Request'
    if (Number != null){
        url = url + '?Number=' + Number
    }

    return await SendRequest(url, 'GET')
}