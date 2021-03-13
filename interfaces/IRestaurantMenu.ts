import Mongoose = require("mongoose");

interface IRestaurantMenu extends Mongoose.Document {
    listId: number;
    tasks: [ {
        itemId: number;
        itemName: string;
        itemDescription: string;
        itemPrice: number;
    }];
}
export {IRestaurantMenu};
