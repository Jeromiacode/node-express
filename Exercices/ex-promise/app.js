// Exercice 1) making Promises
let exercice1 = Promise.resolve('3');

exercice1.then(function (value) {
  console.log(value);
});

let exercice2 = Promise.reject('Booh');

exercice2.catch(function (value) {
  console.log(value);
});

// Exercice 2) Consuming Promises

const itShouldResolve = false;

function makePromiseWithConstructor(itShouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (itShouldResolve) {
        resolve('OK');
      } else reject('PAS OK!');
    }, 1000);
  });
}

makePromiseWithConstructor(itShouldResolve)
  .then((msg) => {
    console.log(msg);
  })
  .catch((msg) => {
    console.log(msg);
  });

const Axios = require('./axios.js');
const fs = require('fs');

Axios.get('https://pokeapi.co/api/v2/generation/1').then((res) => {
  for (let i = 0; i < 10; i++) {
    const { url, name } = res.pokemon_species[i];
    Axios.get(url).then((poke) => {
      fs.writeFileSync(`./data/${name}.txt`, JSON.stringify(poke));
    });
  }
});
