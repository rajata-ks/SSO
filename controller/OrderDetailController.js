"use strict";
exports.__esModule = true;
exports.OrderDetailController = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var OrderDetailController = /** @class */ (function () {
    function OrderDetailController() {
        this.createSchema();
        this.createModel();
    }
    OrderDetailController.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            _id: Number,
            custEmailId: String,
            restaurantId: String,
            itemId: [Number],
            totalPrice: Number
        }, { collection: 'OrderDetail' });
    };
    OrderDetailController.prototype.createModel = function () {
        this.model = mongooseConnection.model("Order", this.schema);
    };
    OrderDetailController.prototype.retrieveOrderDetails = function (response, filter) {
        var query = this.model.find(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    OrderDetailController.prototype.retrieveAllOrderDetails = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    return OrderDetailController;
}());
exports.OrderDetailController = OrderDetailController;
