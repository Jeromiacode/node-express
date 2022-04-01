const ReadlinePromise = require('./modules/readline-promise');
const fs = require('fs');
const path = require('path');

// ↓ On souhaite utilise le mot clef "await"
const exo01 = async () => {
    const reader = new ReadlinePromise();

    let stop = false;
    while (!stop) {
        const firstname = await reader.question('Votre prénom');
        const lastname = await reader.question('Votre nom');

        // Save data in file :D 
        saveNameInFile(firstname, lastname);

        const nextValue = await reader.question('Voulez vous continuer (y/N) ?');
        stop = nextValue.toLowerCase() !== 'y';
    }

    reader.close();
};
exo01();

const saveNameInFile = (firstname, lastname) => {
    const fileName = path.resolve(__dirname, 'data', 'name-list.txt');
    const data = `${firstname} ${lastname}\n`;
    const optionFile = { flag: 'a', encoding: 'utf-8' };

    fs.writeFile(fileName, data, optionFile, (error) => {
        if (error) {
            console.log(error);
        }
    });
};
