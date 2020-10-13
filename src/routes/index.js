const express = require("express");
const path = require("path");
const ProductService = require("../services");
const receipt = "../assets/receipt.pdf";

const platziStore = (app) => {
  const router = express.Router();
  app.use("/api/", router);

  const productService = new ProductService();

  router.get("/", (req, res) => {
    res.send(`API v2`);
  });

  router.get("/receipts", async (req, res, next) => {
    let file = path.join(__dirname, receipt);
    try {
      res.sendFile(file);
    } catch (error) {
      next(error);
    }
  });

  router.get("/products", async (req, res, next) => {
    try {
      const storeProducts = await productService.getProducts();
      res.status(200).json({
        data: storeProducts,
        message: "products listed",
      });
    } catch (error) {
      next(error);
    }
  });

  router.get("/products/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const storeProducts = await productService.getProduct(id);
      res.status(200).json(storeProducts);
    } catch (error) {
      next(error);
    }
  });

  router.post("/product", async (req, res, next) => {
    const product = req.body;
    try {
      const productCreated = await productService.createProduct(product);
      res.status(201).json(productCreated);
    } catch (error) {
      next(error);
    }
  });

  router.put("/product/:id", async (req, res, next) => {
    const { id } = req.params;
    const product = req.body;
    try {
      const productUpdated = await productService.updateProduct(id, product);
      res.status(201).json(productUpdated);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/product/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const productDeleted = await productService.deleteProduct(id);
      res.status(201).json(productDeleted);
    } catch (error) {
      next(error);
    }
  });
};

module.exports = platziStore;
