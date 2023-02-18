import { Router } from "express";
import * as path from 'path';
import { fileURLToPath } from 'url';
import Cart from "../class/cart.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathDB = path.join(__dirname, '../db/carts.json');

const carts = new Cart(pathDB);

const cartRouter = Router();

// GET /api/cart/:cid

cartRouter.get('/:cid', async (req, res) => {
  const id = req.params.cid;
  const cart = await carts.getCartById(id);
  cart ? res.json(cart) : res.json({ error: 'Cart not found' });
});

// POST /api/cart

cartRouter.post('/', async (req, res) => {
  const cart = req.body;
  const newCart = await carts.addCart(cart);
  newCart ? res.json({success: 'Cart added.'}) : res.json({ error: 'Cart not added.' }); 
});

// POST /api/cart/:cid/product/:pid

cartRouter.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const newProduct = await carts.addProductToCart(cartId, productId);
  newProduct ? res.json({success: 'Product added to cart.'}) : res.json({ error: 'Product not added to cart.' });
});


export default cartRouter;