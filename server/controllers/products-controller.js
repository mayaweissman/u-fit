const express = require("express");
const productsLogic = require("../business-logic/products-logic");
const Order = require("../models/order-model");
const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.massage)
    }
});


router.get("/:productTypeId", async (request, response) => {
    try {
        const productTypeId = request.params.productTypeId;
        const products = await productsLogic.getAllProductsPerType(productTypeId);
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.massage)
    }
});


router.post("/order", async (request, response) => {
    try {
        const order = new Order(
            0,
            request.body.userId,
            request.body.address,
            request.body.city,
            request.body.phoneNumber,
            request.body.price);

        const newOrder = await productsLogic.order(order);
        response.status(201).json(newOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;

