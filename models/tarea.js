const { v4: uuidv4 } = require('uuid');

class Tarea {
    id = '';
    description = '';
    completadoWhen = null;


    constructor(description){
        this.id = uuidv4();
        this.description = description;
        this.completadoWhen = null;
    }
}

module.exports = Tarea;