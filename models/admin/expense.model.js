let mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate-v2");
let schema = new mongoose.Schema({
    expension_category: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    payment_type: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    reason: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: ''
    },
    image_path: {
        type: String,
        default: ''
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