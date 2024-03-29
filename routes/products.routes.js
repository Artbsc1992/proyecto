import { Router } from "express";
import * as path from 'path';
import { fileURLToPath } from 'url';
import ProductManager from "../class/ProductManager.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pathDB = path.join(__dirname, '../db/products.json');

const productManager = new ProductManager(pathDB);

const productRouter = Router();

const products = await productManager.getProducts();

// GET /api/productos

productRouter.get('/', async (req, res) => {
  const limit = req.query.limit;
  limit ? res.json(products.slice(0, limit)) : res.json(products);
  console.log('Products sent');
});

// GET /api/productos/:id

productRouter.get('/:pid', async (req, res) => {
  const id = req.params.pid;
  const product = await productManager.getProductById(id);
  product ? res.json(product) : res.json({ error: 'Producto no encontrado' });
});

// POST /api/productos

productRouter.post('/', async (req, res) => {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);
    newProduct ? res.json({success: 'Producto ingresado.'}) : res.json({ error: 'Producto no ingresado.' }); 
});

// DELETE /api/productos/:id

productRouter.delete('/:pid', async (req, res) => {
  const id = req.params.pid;
  const deletedProduct = await productManager.deleteProduct(id);
  deletedProduct ? res.json({success: 'Producto eliminado.'}) : res.json({ error: 'Producto no eliminado.' });
});

export default productRouter;