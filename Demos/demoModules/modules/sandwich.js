class Sandwich {
  constructor (nom, crudite, ...ingredients) {
    this.nom = nom;
    this.crudite = crudite;
    this.ingredients = ingredients;
  }

  getDescription () {
    return `${this.nom} ${this.crudite ? 'avec' : 'sans'} crudité`;
  };

  // getIngredients = () => {
  //   console.log ('Début');
  //   let test = []

  //   for (const ingredient of this.ingredients) {
  //     test.push(ingredient);
  //   }
  //   console.log ('Fin');
  //   return test;
  // };

  getIngredients = function* () {
    console.log ('Début');

    for (const ingredient of this.ingredients) {
      yield ingredient;
    }
    console.log ('Fin');
  };
}

module.exports = Sandwich;
