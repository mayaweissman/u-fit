const dal = require("../data-access-layer/dal");

async function getAllProducts() {
    const sql = "SELECT * FROM products";
    const groups = await dal.executeAsync(sql);
    return groups;

}


async function getAllProductsPerType(productTypeId) {
    const sql = `SELECT Products.*, productTypeFamily FROM productsTypes JOIN products ON Products.productTypeId =  productsTypes.productTypeId WHERE productsTypes.productTypeId = ${productTypeId}`;
    const products = await dal.executeAsync(sql);
    return products;
}

async function order(order){
    const sql = `INSERT INTO Orders VALUES(DEFAULT, ${order.userId}, '${order.address}', '${order.city}', ${order.phoneNumber}, 
    ${order.price})`;
    const info = await dal.executeAsync(sql);
    console.log(info);
    order.orderId = info.insertId;
    return order;
}



module.exports = {
    getAllProducts,
    getAllProductsPerType,
    order
}