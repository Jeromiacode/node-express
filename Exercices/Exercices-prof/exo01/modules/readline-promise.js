const readline = require('readline');

class ReadlinePromise {

    // Déclaration du champ privé necessaire =)
    #reader;

    constructor() {
        // Le # permet de généré un champ privé ♥
        this.#reader = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // Ancien moyen de garantir le lien avec le mot clef "this" 
        // this.question = this.question.bind(this);
    }

    // Utilisation de la fonction fleché => Permet de garantir le lien avec le mot clef "this" 
    question = (message) => {
        // Création d'une promesse
        return new Promise((resolve, reject) => {
            try {
                this.#reader.question(message + "\n> ", (answer) => {
                    resolve(answer);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };

    close = () => {
        this.#reader.close();
    };
}

module.exports = ReadlinePromise;