let mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate-v2");
let schema = new mongoose.Schema({
    subscriptionId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    delivery_date: {
        type: Date,
        require: true
    },
    delivery_timestamp: {
        type: Number,
        require: true
    },
    is_created: {
        type: Boolean,
        default: false
    },
    orderId: {
        type: mongoose.Types.ObjectId,
        default: null
    },
	createdBy: {
		type: mongoose.Types.ObjectId,
		default: null
	},
	updatedBy: {
		type: mongoose.Types.ObjectId,
		default: null
	}
}, { timestamps: true, strict: false, autoIndex: true });
schema.plugin(mongoosePaginate);
module.exports = schema;