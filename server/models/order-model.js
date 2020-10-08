class Order {
    constructor(orderId, userId, address, city, phoneNumber, price){
        this.orderId = orderId;
        this.userId = userId;
        this.address = address;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.price = price;
    }
}

module.exports = Order;