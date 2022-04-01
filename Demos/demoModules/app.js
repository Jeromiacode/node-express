// Import d'un objet avec des fonctions
// const Log = require ('./modules/Log.js');
// Log.error ('Hello');


// Import d'un objet
const {info, error, warning} = require ('./modules/Log.js');

info ('Hello');
error ('Hello');
warning ('Hello');

// Import d'une classe
const Sandwich = require ('./modules/sandwich');
const sandwich = new Sandwich ('Jambon Fromage', true, 'Jambon', 'Fromage', 'Mayo');

console.log (sandwich.getDescription ());

const ingredients = sandwich.getIngredients ();

console.log (ingredients);

console.log ('');

console.log(ingredients.next());
console.log(ingredients.next());
console.log(ingredients.next());
console.log(ingredients.next());

for (const ingredient of ingredients) {
  info (ingredient);
}

console.log ('');

// Import d'une fonction
const isEven = require ('./modules/functionEven');
const test1 = isEven (423);

console.log (test1 ? 'est pair' : 'est impair');

const test2 = require ('./modules/functionEven') (42);
console.log (test2 ? 'est pair' : 'est impair');