import { Router } from 'express';
import { ProductManager } from '../controllers/productManager.js';

const productManager = new ProductManager('src/models/productos.json');

const routerProd = Router();

routerProd.get('/', async (req, res) => {
  const { limit } = req.query;
  const prods = await productManager.getProducts();
  const products = prods.slice(0, limit);
  res.status(200).send(products);
});

routerProd.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  const prod = await productManager.getProductById(pid);

  if (prod) res.status(200).send(prod);
  else res.status(404).send('Producto no existente');
});

routerProd.post('/', async (req, res) => {
  const confirmacion = await productManager.addProducts(req.body);

  if (confirmacion) res.status(200).send('Producto creado correctamente');
  else res.status(404).send('Producto ya existente');
});

routerProd.put('/:pid', async (req, res) => {
  const confirmacion = await productManager.updateProduct(
    req.params.pid,
    req.body
  );

  if (!confirmacion) res.status(200).send('Producto actualizado correctamente');
  else res.status(404).send('Producto no encontrado');
});

routerProd.delete('/:pid', async (req, res) => {
  const confirmacion = await productManager.deleteProduct(req.params.pid);

  if (!confirmacion) res.status(200).send('Producto eliminado correctamente');
  else res.status(404).send('Producto no encontrado');
});

export default routerProd;
