import SendRequest from './base.js'


export default async function GetUsersByCategory(GUID, category){
    let url = `/${GUID}/user/category/${category}/`

    return await SendRequest(url, 'GET')
}