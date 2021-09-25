import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
    id: {
        type: Number
    },
    brand: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    }
}, {
    versionKey: false,
    timestamps: true
});

productSchema.plugin(mongoosePaginate);

export default model('Product', productSchema);