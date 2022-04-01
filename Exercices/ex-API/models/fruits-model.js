const listeFruits = require('./data/fruits.json');

const fruitsModel = {
  getById: (id) => {
    return listeFruits.rows.find((row) => row.id === id);
  },
  getByAll: () => {
    return listeFruits.rows;
  },
  create: (data) => {
    const newId = ++data.lastId;
    const fruit = listeFruits.rows.push({
      id: newId,
      name: data.name,
    });

    listeFruits.rows.push(fruit);
    return fruit;
  },
  update: (data, id) => {
      throw new Error('Not implemented!')
  },
  delete: (id) => {
      const targetIndex = listeFruits.rows.findIndex(row => row.id === id)
      if (target > 0) {
        return listeFruits.rows.splice(targetIndex)
      }
      return false
  },
};

// to : fruits-controller
module.exports = fruitsModel;
