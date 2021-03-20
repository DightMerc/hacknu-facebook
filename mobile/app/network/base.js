const axios = require('axios');

const ENGINE_URL = 'http://onezeth.com:8014/api/v1'

function HandleError(url, method, error, body={}){

        let status = error.response.status
        let message

        console.log(
                `
                REQUEST ERROR:
                --
                METHOD: ${method}
                URL: ${url}
                BODY: ${JSON.stringify(body)}
                --
                CODE: ${error.response.status}
                DATA: ${error.response.data}
                HEADERS: ${JSON.stringify(error.response.headers)}
                `
        )

        if (status == 404){
            message = 'Не найдено'
        } else if (status == 401){
            message = 'Неправильные логин или пароль'
        }

        return {
            'result': error,
            'error': true,
            'message': message
        }
}

export default async function SendRequest(url, method, body=null){

    let end_url = ENGINE_URL + url
    let result

    if (method == 'GET'){
        await axios.get(
            end_url
            )
        .then((response)=>{
            console.log(
                `
                REQUEST SUCCESS
                --
                METHOD: ${method}
                URL: ${end_url}
                --
                CODE: ${response.status}
                `
            )
            result = {
                'result': response.data,
                'error': false
            }
        })
        .catch((error)=>{
            result = HandleError(end_url, method, error)
        })

        return result
    } else if (method == 'POST'){
        await axios.post(
            end_url,
            body
        ).then((response)=>{
            console.log(
                `
                REQUEST SUCCESS
                --
                METHOD: ${method}
                URL: ${end_url}
                --
                CODE: ${response.status}
                `
            )
            result = {
                'result': response.data,
                'error': false
            }
        })
        .catch((error)=>{
            result = HandleError(end_url, method, error)
        })

        return result
    }

}


