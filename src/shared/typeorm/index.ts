import {createConnection} from 'typeorm';
try {
    createConnection();
} catch (error) {
    console.log('Erro na conexão com o banco ...')
}

