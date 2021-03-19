import * as SQLite from 'expo-sqlite';
import * as React from 'react';

const db = SQLite.openDatabase('database_service_desk')

export default class Engine extends React.Component{
    constructor(props){
        super(props)
        console.log('database init')

        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS request_type (id INTEGER PRIMARY KEY AUTOINCREMENT, Description TEXT, GUID TEXT)'
            )
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS material (id INTEGER PRIMARY KEY AUTOINCREMENT, Description TEXT, GUID TEXT)'
            )
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS responsible (id INTEGER PRIMARY KEY AUTOINCREMENT, Description TEXT, GUID TEXT, Parent TEXT, _Group TEXT)',
                [],
                ()=>{},
                (txObj, error)=>{
                    console.log(error)
                }
            )
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS request (id INTEGER PRIMARY KEY AUTOINCREMENT, GUID TEXT, Customer TEXT, WarehouseManager TEXT, RequestType TEXT, Status TEXT, Performer TEXT, RequestNumber TEXT, RequestDate TEXT, InitiatorName TEXT, InitiatorPhone TEXT, InitiatorEmail TEXT, Description TEXT, PerformingType TEXT, Solution TEXT, Accepted TEXT, Arrived TEXT, inspector TEXT, DateAppoint TEXT, DateAccept TEXT, DateArrival TEXT, DateClose TEXT, DatePayment TEXT)'
            )
            
            tx.executeSql('CREATE UNIQUE INDEX IF NOT EXISTS request_type_GUID ON request_type (GUID)')
            tx.executeSql('CREATE UNIQUE INDEX IF NOT EXISTS material_GUID ON material (GUID)')
            tx.executeSql('CREATE UNIQUE INDEX IF NOT EXISTS responsible_GUID ON responsible (GUID)')
            tx.executeSql('CREATE UNIQUE INDEX IF NOT EXISTS request_GUID ON request (GUID)')

            // tx.executeSql('DELETE FROM request')
            // tx.executeSql('DELETE FROM material')
            // tx.executeSql('DELETE FROM responsible')
            // tx.executeSql('DELETE FROM request_type')

            // tx.executeSql('DROP TABLE request')



          });

        this.db = db
    }

    SetRequestType(content){
        content = this.PrepareData(content)
        // console.log(content)
        let task = `REPLACE INTO request_type (Description, GUID) values `
        content.map((array)=>{
            array.map((element)=>{
                
                let values = `("${element.Description}", "${element.GUID}"), `
                task += values
    
            })
        })

        task = task.substring(0, task.length - 2);
        this.db.transaction(
            tx=>{
                tx.executeSql(
                    task
                ),
                [],
                ()=>{},
                (txObj, error)=>{
                    console.log(error)
                }
            }
        )
    }

    SetMaterial(content){
        content = this.PrepareData(content)
        let task = `REPLACE INTO material (Description, GUID) values `
        content.map((array)=>{
            array.map((element)=>{
            
            let values = `("${element.Description}", "${element.GUID}"), `
            task += values

            })
        })

        task = task.substring(0, task.length - 2);

        this.db.transaction(
            tx=>{
                tx.executeSql(
                    task
                )
            }
        )
    }

    SetResponsible(content){
        content = this.PrepareData(content)
        let task = `REPLACE INTO responsible (Description, GUID, Parent, _Group) values `
        content.map((array)=>{
            array.map((element)=>{
            
            let values = `("${element.Description}", "${element.GUID}", "${element.Parent}", "${element.Group}"), `
            task += values

            })
        })

        task = task.substring(0, task.length - 2);

        this.db.transaction(
            tx=>{
                tx.executeSql(
                    task
                )
            }
        )
    }

    PrepareData(data){

        let size = 500, i, endData = []

        for (i = 0; i < data.length; i += size) endData.push(data.slice(i, i + size))

        return endData
    }
}