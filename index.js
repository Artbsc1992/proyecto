import express from "express";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";

const app = express();

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));



// products routes

const BASE_PRODUCT = "/api/products";

app.use(`${BASE_PRODUCT}`, productRouter);

// carts routes

const BASE_CART = "/api/carts";

app.use(`${BASE_CART}`, cartRouter);

