let mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate-v2");
let schema = new mongoose.Schema({
	mobile: {
		type: String
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	username: {
		type: String
	},
	// is_subscriber: {
	// 	type: Boolean,
	// 	default: false
	// },
	// active_subscriber_plan: {
	// 	type: mongoose.Types.ObjectId,
	// 	default: null
	// },
	// active_plan_Id: {
	// 	type: mongoose.Types.ObjectId,
	// 	default: null
	// },
	// is_profile_completed: {
	// 	type: Boolean,
	// 	default: false
	// },
	// fcm_token: {
	// 	type: String,
	// 	default: ''
	// },
	// channelID: {
	// 	type: String,
	// 	default: ''
	// },
	status: {
		type: Boolean,
		default: false
	},
	otp: {
		type: Number
	},
	// is_parent: {
	// 	type: Boolean,
	// 	default: false
	// },
	// parentId: {
	// 	type: mongoose.Types.ObjectId,
	// 	default: null
	// },
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