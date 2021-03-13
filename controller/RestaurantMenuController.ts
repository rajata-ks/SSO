import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IRestaurantMenu} from '../interfaces/IRestaurantMenu';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class RestaurantMenuController {
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
                restaurantId: String,
                itemName: String,
                itemDescription: String,
                itemPrice: Number,
                menuItemImageUrl :String,
            }, {collection: 'restaurantMenu'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IRestaurantMenu>("Menu", this.schema);
    }
    
    public retrieveMenuDetails(response:any, filter:Object) {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public deleteMenuItem(response:any, filter:Object) {
        //db.mycol.remove({'title':'MongoDB Overview'})
        var query = this.model.remove(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

}
export {RestaurantMenuController};
