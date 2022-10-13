const Tarea = require('./Tarea');

class Tareas {
    _listado = {};

    get _listadoArray() { 
        const listado = [];
        Object.keys(this._listado).forEach( keys => {
            listado.push( this._listado[keys] );
        });  
        return  listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id ) {
        if ( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareasDesdeArreglo( tareas = []){
        tareas.forEach( tarea   => this._listado[tarea.id] = tarea );
    }

    crearTarea(description = ''){
        
        const tarea = new Tarea(description);
        this._listado[tarea.id] = tarea;

    }
    
    listadoCompleto(){
        this._listadoArray.forEach( (tarea, i) => {
            const idx = `${i+1}`.green;
            const { description , completadoWhen } = tarea;
            const estado = ( completadoWhen )
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            console.log( `${idx} ${description} :: ${estado}` );

        }); 
    }
    
    listarEstadoTarea(completadas = true){
        let contador = 0;
        this._listadoArray.forEach( tarea => {
            const { description, completadoWhen } = tarea;  
            const estado = ( completadoWhen )
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            if ( completadas ) {
                if ( completadoWhen ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green }. ${ description } :: ${ completadoWhen.green }`); 
                }
            } else {
                if ( !completadoWhen ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green }. ${ description } :: ${ estado.red }`); 
                }
            }
        });
    }

    cambiarEstadoTarea ( ids = [] ){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if( !tarea.completadoWhen ){
                tarea.completadoWhen = new Date().toISOString().split('T')[0];
                
            }
        });

        this._listadoArray.forEach( tarea => {
            if ( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoWhen = null;    
            }
        });
    }

};

module.exports = Tareas;