import SendRequest from './base.js'


export default async function GetResponsibleList(Number=null){
    let url = '/download/responsible'

    return await SendRequest(url, 'GET')
}