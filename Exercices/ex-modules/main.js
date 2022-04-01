// require("./modules/annif.js");
// const noel = require("./modules/noel.js");
// const annif = require("./modules/annif2.js");
// annif();

// noel();

// correction

const eventDays = require("./modules/correction.js");

const christmas = eventDays.fromChristmas();
console.log("Noel :" + christmas);
const birthdate = eventDays.fromBirthdate(17, 07);
console.log("Date de Naissance :" + birthdate);
const holiday = eventDays.fromHolidays();
console.log("Vacances :" + holiday);
const solstice = eventDays.fromSolstice();
console.log("Solstice :" + solstice);
const vendredi = eventDays.fromNextFriday13();
console.log("Vendredi 13 du mois :" + vendredi);
