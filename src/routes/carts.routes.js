import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';

const routerCart = Router();

routerCart.post('/', async (req, res) => {
  const cartId = uuidv4();

  const newCart = {
    id: cartId,
    products: [],
  };

  await fs.writeFile(
    './src/models/carritos.json',
    JSON.stringify(newCart, null, 2)
  );
  if (newCart) res.status(200).send('Carrito creado con éxito');
  else res.status(404).send('Carrito ya existente');
});

routerCart.get('/:id', async (req, res) => {
  const cartId = req.params.id;

  const cart = JSON.parse(
    await fs.readFile('./src/models/carritos.json', 'utf8')
  );

  if (cart.id === cartId) {
    res.status(200).send(cart.products);
  } else {
    res.status(404).send('Carrito no encontrado');
  }
});

routerCart.post('/:id/product/:pid', async (req, res) => {
  const cartId = req.params.id;
  const productId = req.params.pid;

  const cart = JSON.parse(
    await fs.readFile('./src/models/carritos.json', 'utf8')
  );

  if (cart.id === cartId) {
    const existingProductIndex = cart.products.findIndex(
      (product) => product.product === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += 1;
    } else {
      cart.products.push({
        product: productId,
        quantity: 1,
      });
    }

    await fs.writeFile(
      './src/models/carritos.json',
      JSON.stringify(cart, null, 2)
    );

    res.status(200).send(cart.products);
  } else {
    res.status(404).send('Carrito no encontrado');
  }
});

export default routerCart;
