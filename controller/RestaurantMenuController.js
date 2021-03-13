"use strict";
exports.__esModule = true;
exports.RestaurantMenuController = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var RestaurantMenuController = /** @class */ (function () {
    function RestaurantMenuController() {
        this.createSchema();
        this.createModel();
    }
    RestaurantMenuController.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            _id: Number,
            restaurantId: String,
            itemName: String,
            itemDescription: String,
            itemPrice: Number,
            menuItemImageUrl: String
        }, { collection: 'restaurantMenu' });
    };
    RestaurantMenuController.prototype.createModel = function () {
        this.model = mongooseConnection.model("Menu", this.schema);
    };
    RestaurantMenuController.prototype.retrieveMenuDetails = function (response, filter) {
        var query = this.model.find(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    RestaurantMenuController.prototype.deleteMenuItem = function (response, filter) {
        //db.mycol.remove({'title':'MongoDB Overview'})
        var query = this.model.remove(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    return RestaurantMenuController;
}());
exports.RestaurantMenuController = RestaurantMenuController;
