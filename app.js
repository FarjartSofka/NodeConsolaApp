require('colors');

const { guardarInformacion, leerDb } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pausa,
        leerInput, 
        listadoTareasBorrar,
        listadoTareasCompletar,
        cambiarEstadoTarea,
        confirmar
    } = require('./helpers/inquirer');
const Tareas = require('./models/tareas')

console.clear();

const main = async() => {

    let opcion = '';
    const tareas = new Tareas();

    const tareasDB = leerDb();
    if( tareasDB ){
        tareas.cargarTareasDesdeArreglo(tareasDB);
    }

    do {
        opcion = await inquirerMenu();
        switch (opcion) {
            case '1':
                const description = await leerInput('Descripcion: ');
                tareas.crearTarea(description);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarEstadoTarea(true);
            break;
            case '4':
                tareas.listarEstadoTarea(false);
            break;
            case '5':
                const ids = await listadoTareasCompletar(tareas._listadoArray);
                tareas.cambiarEstadoTarea(ids);
            break;
            case '6':
                const id = await  listadoTareasBorrar( tareas._listadoArray );
                if (id !== '0'){
                    const ok = await confirmar('¿Esta Seguro?');
                    if (ok ){
                       tareas.borrarTarea(id);
                       console.log('Tarea borrada exitosamente');
                    }
                }
            break;
        }

        guardarInformacion(tareas._listadoArray); 

        await pausa();

    }while (opcion !== '');


    //pausa();
}

main();
