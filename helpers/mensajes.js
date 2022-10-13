require("colors");

const mostrarMenu = async() => {
  return new Promise((resolve) => {
    console.clear();
    console.log("=====================================".blue);
    console.log("   Seleccione una Opcion".blue);
    console.log("=====================================\n".blue);

    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar tarea`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"5.".green} Completar tareas`);
    console.log(`${"6.".green} Borrar tarea`);
    console.log(`${"0.".green} Salir \n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione una opcion: ", (option) => {
      readline.close();
      resolve(option);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(
      `\n Presione ${"ENTER".green} para continuar \n`,
      (option) => {
        readline.close();
        resolve();
      }
    );
  });
};

module.exports = {
  pausa,
  mostrarMenu,
};
