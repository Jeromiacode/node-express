const readline = require('readline');

class ReadingPromise {
  #reader;
  constructor() {
    this.#reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  question = (message) => {
    return new Promise((resolve, reject) => {
      try {
        this.#reader.question(message, (answer) => {
          resolve(answer);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  close = () => {
    this.#reader.close();
  };
}

module.exports = ReadingPromise;
