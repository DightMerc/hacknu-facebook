import Engine from './base.js'
import * as React from 'react';

    
export default async function GetAllRequestTypes(){

    let result = 'result'
    let engine = new Engine()
    result = engine.db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM request_type',
            [],
            (txObj, resultSet)=>{
                console.log(resultSet)
                resultSet.rows['_array']
            }
        )
        });
    return result
}