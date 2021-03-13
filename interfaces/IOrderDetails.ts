import Mongoose = require("mongoose");

interface IOrderDetails extends Mongoose.Document {
    OrderId: number;
    details: [ {
        custEmailId: string; 
        restauarntId: number;
        menuId: number;
        itemIds: [number]; 
        itemPrice: number;
        orderDate: Date;
    }];
}
export {IOrderDetails};