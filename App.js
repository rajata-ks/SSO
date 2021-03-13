"use strict";
exports.__esModule = true;
exports.App = void 0;
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var RestaurantController_1 = require("./controller/RestaurantController");
var RestaurantMenuController_1 = require("./controller/RestaurantMenuController");
var OrderDetailController_1 = require("./controller/OrderDetailController");
var passport = require("passport");
var googlePassport_1 = require("./googlePassport");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.expressApp = express();
        this.expressApp.use(cors());
        this.middleware();
        this.routes();
        this.Restaurant = new RestaurantController_1.RestaurantController();
        this.RestaurantMenu = new RestaurantMenuController_1.RestaurantMenuController();
        this.OrderDetail = new OrderDetailController_1.OrderDetailController();
        this.rIdGenerator = 100;
        this.mIdGenerator = 100;
        this.orderIdGenerator = 100;
        this.googlePassportObj = new googlePassport_1["default"]();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(session({ secret: 'keyboard cat' }));
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    };
    App.prototype.validateAuth = function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/');
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
        router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
            console.log("successfully authenticated user and returned to callback page.");
            console.log("redirecting to /#/list");
            res.redirect('/app/restaurantList/');
        });
        //Add restaurant
        router.post('/app/addRestaurant/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj._id = _this.rIdGenerator;
            _this.Restaurant.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('Restaurant not added  ', err);
                    return;
                }
            });
            res.send(_this.rIdGenerator.toString());
            _this.rIdGenerator++;
        });
        //Display restaurant with specific id
        router.get('/app/restaurantList/:restaurantId', function (req, res) {
            var id = req.params.restaurantId;
            console.log('Query single restaurant with id: ' + id);
            _this.Restaurant.retrieveRestaurantDetails(res, { _id: id });
        });
        //Display all restaurant List
        router.get('/app/restaurantList/', function (req, res) {
            console.log('Query All Restaurants');
            _this.Restaurant.retrieveAllRestaurantLists(res);
        });
        //Display menu of a specific restaurant
        router.get('/app/restaurantMenu/:restaurantId', function (req, res) {
            var id = req.params.restaurantId;
            console.log('Query single restaurant menu with id: ' + id);
            _this.RestaurantMenu.retrieveMenuDetails(res, { restaurantId: id });
        });
        //Display a specific menu from restaurant menu
        router.get('/app/restaurantMenuItem/:itemId', function (req, res) {
            var id = req.params.itemId;
            _this.RestaurantMenu.retrieveMenuDetails(res, { _id: id });
        });
        //Add menu for a specific restaurant
        router.post('/app/addRestaurantMenuItem/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj._id = _this.mIdGenerator;
            _this.RestaurantMenu.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('Menu Item not added  ', err);
                    return;
                }
            });
            res.send(_this.mIdGenerator.toString());
            _this.mIdGenerator++;
        });
        //Delete a specific menu from specific restaurant 
        router["delete"]('/app/restaurantMenuItem/:itemId', function (req, res) {
            var id = req.params.itemId;
            _this.RestaurantMenu.deleteMenuItem(res, { _id: id });
        });
        //Delete a specific restauarant
        router["delete"]('/app/deleteRestaurant/:restaurantId', function (req, res) {
            var id = req.params.restaurantId;
            console.log('Restaurant deleted');
            _this.Restaurant.deleteRestaurant(res, { _id: id });
        });
        //Get order details for specific order Id
        router.get('/app/orderDetails/:orderID', function (req, res) {
            var id = req.params.orderID;
            _this.OrderDetail.retrieveOrderDetails(res, { _id: id });
        });
        //Create order
        router.post('/app/addOrder/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj._id = _this.orderIdGenerator;
            _this.OrderDetail.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('Order could not be created', err);
                    return;
                }
            });
            res.send(_this.orderIdGenerator.toString());
            _this.orderIdGenerator++;
        });
        //Display all order details
        router.get('/app/OrderDetails/', function (req, res) {
            console.log('Query All Orders');
            _this.OrderDetail.retrieveAllOrderDetails(res);
        });
        //Display specific order details
        router.get('/app/OrderDetails/:emailId', function (req, res) {
            var emailId = req.params.emailId;
            console.log("Email id = " + emailId);
            _this.OrderDetail.retrieveOrderDetails(res, { emailId: emailId });
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    };
    return App;
}());
exports.App = App;
