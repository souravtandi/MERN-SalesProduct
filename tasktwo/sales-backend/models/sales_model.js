const mongoose = require('mongoose');
const SchemaTypes = mongoose.Schema.Types;

const salesSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true 
    },
    quantity: {
        type: SchemaTypes.Number,
        required: true 
    },
    totalAmount: {
        type: SchemaTypes.Decimal128,
        required: true
    },
    dateOfSale: {
        type: Date,
        required: true
    }
});

mongoose.model("SalesModel", salesSchema);