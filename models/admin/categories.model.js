let mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate-v2");
let schema = new mongoose.Schema({
     name: {
		type: String,
		require: true
	},
	status: {
		type: Boolean,
		require: true
	},
	path: {
		type: String,
		require: true
	}
}, { timestamps: true, strict: false, autoIndex: true });
schema.plugin(mongoosePaginate);
module.exports = schema;