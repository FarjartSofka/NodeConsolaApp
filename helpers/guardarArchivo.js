const fs = require('fs');
const archivo = './db/data.json';

const guardarInformacion = ( data ) => {
    fs.writeFileSync( archivo, JSON.stringify(data) );
};

const leerDb = () => {  
    if ( !fs.existsSync( archivo ) ){
        return null;
    }
    const info = fs.readFileSync( archivo, {encoding: 'utf8'});
    const data = JSON.parse(info);
    return data;
};

module.exports = {
    guardarInformacion,
    leerDb
}