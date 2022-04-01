const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

reader.question("Quel est le jour de ton anniversaire ?: ", (jour) => {
  reader.question("Et ton mois de naissance ?: ", (mois) => {
    const annee = new Date().getFullYear();
    const today = new Date();
    const date = new Date(annee, mois, jour);
    const timeGap = date.getTime() - today.getTime();
    const annif =
      "Cool ! Il reste : " +
      parseInt(timeGap / (1000 * 3600 * 24)) +
      " jours avant ton anniversaire !";
    console.log(annif);
    reader.close();
  });
});

module.exports = reader;
