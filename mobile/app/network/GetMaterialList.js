import SendRequest from './base.js'


export default async function GetMaterialList(){
    let url = '/download/Material'

    return await SendRequest(url, 'GET')
}