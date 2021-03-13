import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IOrderDetails} from '../interfaces/IOrderDetails';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class OrderDetailController {
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
                custEmailId: String,
                restaurantId: String,
                itemId: [Number],
                totalPrice: Number,
            }, {collection: 'OrderDetail'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IOrderDetails>("Order", this.schema);
    }

    public retrieveOrderDetails(response:any, filter:Object) {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveAllOrderDetails(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }
}

export {OrderDetailController};