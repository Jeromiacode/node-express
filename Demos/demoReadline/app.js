// https://nodejs.org/dist/latest-v16.x/docs/api/readline.html
const readline = require ('readline');

// Créer un outils qui permet d'interagir avec la console
const reader = readline.createInterface ({
  input: process.stdin,
  output: process.stdout,
});

// Permet d'écrire dans la console
// reader.write("Bonjour les Full Stack JS !")

reader.write ('Menu: ');
reader.write ('\n\t1. Entre ton nom');
reader.write ('\n\t2. Entre ton age');
reader.write ('\n');

// Permet d'interargir avec une l'utilisateur en posant une "question"
reader.question ('Quel est votre choix : ', answer => {
  switch (parseInt (answer)) {
    case 1:
      reader.question ('Entrez ton nom : ', answer => {
        reader.write ('Ton nom est : ' + answer);
        finishReader ();
      });
      break;
    case 2:
      break;
    default:
      break;
  }
});

const finishReader = () => {
  reader.write ('Fin du reader');
  reader.close ();
};
