import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const productId = uuidv4();

export class ProductManager {
  constructor() {
    this.produts = [];
  }

  async getProducts() {
    const prods = JSON.parse(
      await fs.readFile('./src/models/productos.json', 'utf-8')
    );
    return prods;
  }

  async getProductById(id) {
    const prods = JSON.parse(
      await fs.readFile('./src/models/productos.json', 'utf-8')
    );
    const prod = prods.find((producto) => producto.id === id);

    if (prod) {
      return prod;
    } else {
      return false;
    }
  }

  async addProducts(prod) {
    const prods = JSON.parse(
      await fs.readFile('./src/models/productos.json', 'utf8')
    );
    const existProd = prods.find((producto) => producto.code === prod.code);

    if (existProd) {
      return false;
    } else {
      prod.id = productId;
      prods.push(prod);
      await fs.writeFile('./src/models/productos.json', JSON.stringify(prods));
      return true;
    }
  }

  async updateProduct(id, updatedFields) {
    const prods = JSON.parse(
      await fs.readFile('./src/models/productos.json', 'utf-8')
    );
    const prodIndex = prods.findIndex((producto) => producto.id === id);

    if (prodIndex != -1) {
      const updatedProduct = { ...prods[prodIndex], ...updatedFields };
      prods[prodIndex] = updatedProduct;
      await fs.writeFile(
        './src/models/productos.json',
        JSON.stringify(prods, null, 2)
      );
    } else {
      return false;
    }
  }

  async deleteProduct(id) {
    const prods = JSON.parse(
      await fs.readFile('./src/models/productos.json', 'utf-8')
    );
    const prodIndex = prods.findIndex((producto) => producto.id === id);

    if (prodIndex != -1) {
      await fs.writeFile(
        './src/models/productos.json',
        JSON.stringify(prods.filter((producto) => producto.id != id))
      );
    } else {
      return false;
    }
  }
}
