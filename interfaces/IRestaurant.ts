import Mongoose = require("mongoose");

interface IRestaurant extends Mongoose.Document {
    restaurantName: string;
    restaurantId: number;
    restaurantAddress: string;
    phoneNumber: string;
    ownerId:String;
    RestaurantOwner:string;
}
export {IRestaurant};