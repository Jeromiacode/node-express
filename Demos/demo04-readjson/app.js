const ReadingPromise = require('./modules/reader');
const fs = require('fs');
const path = require('path');
const reader = new ReadingPromise();

const exo01 = async () => {
  let stop = false;
  while (!stop) {
    const firstname = await reader.question('Votre prénom? ');
    const lastname = await reader.question('Votre nom? ');
    const nextValue = await reader.question('Voulez-vous continuer (y/N)? ');

    saveNameInFile(firstname, lastname);

    stop = nextValue.toLowerCase() !== 'y';
  }
  reader.close();
};

exo01();

const saveNameInFile = (firstname, lastname, callback) => {
  // __dirname si l'execution du terminal se fait pas a la racine du dossier
  const filename = path.resolve(__dirname, 'data', 'name-list.txt');
  const data = `${firstname} ${lastname} \n`;
  const options = { flag: 'a', encoding: 'utf-8' };

  fs.writeFile(filename, data, options, (error) => {
    // error && callback(); (si il y a un callback)
    // error ?? console.log(error);
    // if (error) () => console.log(error);
    // est égal à :
    if (error) {
      console.error(error);
      return;
    }
  });
};

const fileName = path.resolve(__dirname, 'data', 'students.json');

const readNameInFile = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (error, data) => {
      if (error) () => reject(error);
      try {
        const dataJson = JSON.parse(data);
        resolve(dataJson);
      } catch (error) {
        reject(error);
      }
    });
  });
};

// ex02();
