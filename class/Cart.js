import * as fs from 'fs/promises';

export default class Cart {
  constructor(path) {
    this.path = path;
  }

  async addCart(cart) {
    try {
      const carts = await this.getCart();
      const newCart = { id: carts.length + 1, ...cart };
      carts.push(newCart);
      fs.writeFile(this.path, JSON.stringify(carts), 'utf-8');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getCart() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      return false
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCart();
      const cart = carts.find(cart => cart.id === parseInt(id));
      return cart.products;
    } catch (error) {
      console.log(error);
      return false;
    }
  } 

  async addProductToCart(cartId, productId) {
    try {
      const carts = await this.getCart();
      const cart = carts.find(cart => cart.id === parseInt(cartId));
      const product = cart.products.find(product => product.id === parseInt(productId));
      if (product) {
        product.quantity += 1;
      } else {
        cart.products.push({ id: productId, quantity: 1 });
      }
      fs.writeFile(this.path, JSON.stringify(carts), 'utf-8');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }



}