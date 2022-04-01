const data = require('../data/product.json');

const productController = {
  // GET tout les produits
  getAll: (req, res) => {
    const products = data.products;
    // res /* Old-School Yo! */
    //   .writeHead(200, { 'Content-Type': 'application/json' })
    //   .end(JSON.stringify(products));
    res.json(products);
  },
  // GET un produit via son id
  getById: (req, res) => {
    const { id } = req.params;
    const product = data.products.find((p) => p.id === parseInt(id));
    if (!product) {
      return res.sendStatus(404).json({ message: 'Produit inexistant' });
    }
    res.send(product);
  },
  // GET +eurs produits via leur nom
  getByName: (req, res) => {
    // const productsName = data.products.filter((p) => p.id === toString(id));
    res.sendStatus(501);
  },
  // POST ajout d'un produit
  add: (req, res) => {
    const newProduct = req.body;
    const newId = ++data.lastId;

    data.products.push({
      id: newId,
      ...newProduct,
    });
    res.json({
      message: `Ajout du produit n°${newId}`,
    });
  },
  // POST màj des produits (patch : pour un produit)
  update: (req, res) => {
    const id = parseInt(req.params.id);
    const indexProduct = data.products.findIndex((p) => p.id === id);

    if (indexProduct === -1) {
      return res
        .status(404)
        .json({ message: `Le produit n°${id} n'existe pas !` });
    }

    // const updateProduct = req.body;
    // data.products[indexProduct] = {
    //   id, ...updateProduct
    // }
    // res.sendStatus(204);

    // Ou
    res.json({
      message: `Update du produit réussi ! ${data.products[indexProduct]}`,
    });
  },
  // POST suppression d'un produit
  delete: (req, res) => {
    const id = parseInt(req.params.id);

    const indexTarget = data.products.findIndex((p) => p.id === id);

    if (indexTarget === -1) {
      return res
        .status(404)
        .json({ message: `Le produit n°${id} n'existe pas !` });
    }

    // Suppression de l'element
    data.products.splice(indexTarget, 1);

    // Ou
    // data.products = data.products.filter(p => p.id !== id);

    // Envoi d'un réponse
    return res.status(200).json({
      message: `Le produit ${id} a été supprimé avec succes`,
    });
  },
};

// to : product-route
module.exports = productController;
