const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Exercice 1
const filename = path.resolve('data', 'text.txt');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

reader.question('Donnez un prénom à ajouter : ', (nom) => {
  reader.question('Et un nom : ', (prenom) => {
    const data = `${nom} ${prenom} \n`;

    fs.writeFile(filename, data, { flag: 'a' }, (error) => {
      if (error) {
        console.error(error);
        return;
      }
      fs.readFile(filename, { encoding: 'utf8' }, (error, data) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log(data.toString('utf-8'));
      });
    });
    reader.close();
  });
});

// Exercice 2
// const students = path.resolve('data', 'students.json');

// fs.readFile(students, { encoding: 'utf8' }, (error, data) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   let infos = JSON.parse(data);
//   infos.results.forEach((results) => {
//     // for (let i = 0; i < results.students.length; i++) {
//     //   let moyenne = results.students[i].year_result;
//     //   console.log(moyenne);
//     // }
//     let sectionName = results.section.name;
//     console.log(
//       `${results.professor.firstname} est professeur de la section : ${sectionName}`
//     );
//     results.students.forEach((students) => {
//       console.log(
//         `${students.firstname} est élève de la section : ${sectionName}`
//       );
//       // console.log(
//       //   `Le résultats de la section ${sectionName} est : ${students.year_result}`
//       // );
//     });
//   });
// });
