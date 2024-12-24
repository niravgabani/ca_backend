// let mongoose = require("mongoose");
// let mongoosePaginate = require("mongoose-paginate-v2");
// let otherImages = new mongoose.Schema({
// 	path: {
// 		type: String,
// 		require: true
// 	}
// });
// let schema = new mongoose.Schema({
// 	title: {
// 		type: String,
// 		require: true
// 	},
// 	description: {
// 		type: String,
// 		require: true
// 	},
// 	bannerImage: {
// 		type: String,
// 		require: true
// 	},
// 	otherImages: [otherImages],
// 	cod: {
// 		type: Boolean,
// 		default: false
// 	},
// 	status: {
// 		type:Boolean,
// 		default: false
// 	},
// 	createdBy: {
// 		type: mongoose.Types.ObjectId,
// 		default: null
// 	},
// 	updatedBy: {
// 		type: mongoose.Types.ObjectId,
// 		default: null
// 	}
// }, { timestamps: true, strict: false, autoIndex: true });
// schema.plugin(mongoosePaginate);
// module.exports = schema;

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const descriptionSchema = new mongoose.Schema({
  sub_description: {
    type: String,
    required: true,
  },
  descriptionList: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    }
  ],
  storage_information: [
    {
      description: {
        type: String,
        required: true,
      },
    }
  ],
  shelf_life: [
    {
      description: {
        type: String,
        required: true,
      },
    }
  ],
  benefit: [
    {
      description: {
        type: String,
        required: true,
      },
    }
  ],
  faq: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    }
  ]
});

const otherImagesSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  }
});

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  categoriesId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bannerImage: {
    type: String,
    required: true,
  },
  otherImages: [otherImagesSchema],
  cod: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
  productDetails: {
    type: String,
    required: true,
  },
  description: descriptionSchema,
  createdBy: {
    type: mongoose.Types.ObjectId,
    default: null,
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    default: null,
  }
}, { timestamps: true, strict: false, autoIndex: true });

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);
