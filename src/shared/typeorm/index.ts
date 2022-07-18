import {Connection, createConnection} from 'typeorm';
try {
    createConnection().then((conn:Connection)=>{
        console.log(` Connection sucess in database ${conn.driver.database}`)
    });
} catch (error) {
    console.log('Erro na conexão com o banco ...')
}

