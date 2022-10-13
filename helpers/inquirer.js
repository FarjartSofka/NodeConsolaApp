require('colors');

const inquirer = require('inquirer');

const preguntas = [
    {
        type : 'list',
        name : 'opcion',
        message : '¿Que desea hacer?',
        choices : [ 
            {
                value: '1',
                name: `${"1. ".green} Crear tarea`,
            },
            {
                value: '2',
                name: `${"2. ".green} Listar tarea`,
            },
            {
                value: '3',
                name: `${"3. ".green} Listar tareas completadas`,
            },
            {
                value: '4',
                name: `${"4. ".green} Listar tareas pendientes`,
            },
            {
                value: '5',
                name: `${"5. ".green} Completar tarea(s)`,
            },
            {
                value: '6',
                name: `${"6. ".green} Borrar tarea`,
            },
            {
                value: '0',
                name: `${"0. ".green} Salir`,
            }, 
        ], 
    }
];

const inquirerMenu = async() => { 
    console.clear();
    console.log("=====================================".blue);
    console.log("   Seleccione una Opcion".white);
    console.log("=====================================\n".blue);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
};

const pausa = async() => {

    const preguntas = {
        type: 'input',
        name: 'pausa',
        message: `\n Presione ${ 'enter'.green }  para continuar`,
    };

    await inquirer.prompt(preguntas);

};

const leerInput = async(message) => {
    const preguntas =[
        {
            type: 'input',
            name: 'description',
            message,
            validate (value){
                if (value.length === 0) { 
                    return 'Por favor ingrese un valor \n';
                }  
                return true; 
            }
        }
    ];

    const { description } = await inquirer.prompt(preguntas);

    return description; 
};

const listadoTareasBorrar = async (tareas = []) => {
   const choices = tareas.map( (tarea, idx) => {
    return{
        value: tarea.id,
        name: `${idx +1 +'. '} ${tarea.description} `.green 
    }
   });
   choices.unshift({
        value: '0',
        name: '0. '.green + ' Cancelar'
   })
   const preguntas = [
    {
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }
   ]
   const { id } = await inquirer.prompt(preguntas);
   return id
};

const listadoTareasCompletar = async (tareas = []) => {
    const choices = tareas.map( (tarea, idx) => {
     return{
         value: tarea.id,
         name: `${idx +1 +'. '} ${tarea.description} `.green ,
         checked: (tarea.completadoWhen) ? true : false
     }
    });
    choices.unshift({
         value: '0',
         name: '0. '.green + ' Cancelar'
    })
    const pregunta = [
     {
         type: 'checkbox',
         name: 'ids',
         message: 'Seleccione',
         choices
     }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids
 };

const confirmar = async (message) => { 
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } =  await inquirer.prompt(question);
    return ok;
};

module.exports = { 
    inquirerMenu,
    pausa, 
    leerInput,
    listadoTareasBorrar,
    listadoTareasCompletar,
    confirmar
}