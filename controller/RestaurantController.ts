import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IRestaurant} from '../interfaces/IRestaurant';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class RestaurantController{
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {   
                _id: Number, 
                restaurantName: String,
                restaurantAddress: String,
                phoneNumber: String,
                restaurantImageUrl: String,
                ownerId:String,
                restaurantOwner: String
            }, {collection: 'restaurants'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IRestaurant>("Restaurant", this.schema);
    }

    public retrieveAllRestaurantLists(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    public retrieveRestaurantDetails(response:any, filter:Object) {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }


    public deleteRestaurant(response:any, filter:Object) {
        var query = this.model.remove(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public async addRestaurant(res:any, jsonObj: any) {
        const conflict = "Restaurant with the same location already exists";
        const success = "Restaurant created successfully";
        const output = await this.model.find({restaurantAddress: jsonObj.restaurantAddress})
        .then(res => {
            if (res.length === 0) {
                console.log("Creating a new restaurant");
                this.createRestaurant(jsonObj);
                return success;
            } else {
                console.log(conflict);
                return conflict;
            }
        })
        if(output === conflict) {
            res.status(409);
        }
        return res.json(output);
    }

    private async createRestaurant(jsonObj: any) {
        this.model.create([jsonObj], (err, response) => {
            if (err) {
                console.log("Restaurant not added");
            }
            console.log(response);
        });
    }
}
export {RestaurantController}