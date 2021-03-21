import SendRequest from './base.js'


export default async function GetCategoriesList(Number=null){
    let url = '/categories/'

    return await SendRequest(url, 'GET')
}