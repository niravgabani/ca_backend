const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mongoConnection = require('../../utilities/connections');
const responseManager = require('../../utilities/response.manager');
const constants = require('../../utilities/constants');
const helper = require('../../utilities/helper');
const adminModel = require('../../models/admin/admin.model');
const userModel = require('../../models/users/users.model');
const categoriesModel = require('../../models/admin/categories.model');
// const productModel = require('../../models/admin/products.model');
// const veriantModel = require('../../models/admin/veriants.model');
// const reviewModel = require('../../models/users/review.model');
// const sizeMasterModel = require('../../models/admin/size.master');
const filehelper = require('../../utilities/multer.functions');
const allowedContentTypes = require('../../utilities/content-types');
const aws = require('../../utilities/aws');


router.post('/', async (req , res) => {
     const {pagination , page , limit , search} = req.body;
     if(req.token._id && mongoose.Types.ObjectId.isValid(req.token._id)){
       let primary = mongoConnection.useDb(constants.DEFAULT_DB);
       let adminData = await primary.model(constants.MODELS.admins, adminModel).findById(req.token._id).lean();
       if(adminData && adminData != null){
         if(pagination === true){
           await primary.model(constants.MODELS.categories, categoriesModel).paginate({
             $or: [
               {name: {$regex: search, $options: 'i'}}
             ]
           },{
             page,
             limit: parseInt(limit),
             select: '_id name path status',
             sort: {createdAt: -1},
             lean: true
           }).then((sizes) => {
               console.log("hh",sizes);
             return responseManager.onSuccess('Sizes data...!', sizes, res);
           }).catch((error) => {
             return responseManager.onError(error, res);
           });
         }else{
           let sizes = await primary.model(constants.MODELS.categories, categoriesModel).find({status: true}).select('_id name path status').lean();
           return responseManager.onSuccess('List of all sizes...!' , sizes , res);
         }
       }else{
         return responseManager.badrequest({message: 'Invalid token to get admin, Please try again...!'}, res);
       }
     }else{
       return responseManager.badrequest({message: 'Invalid token to get admin, Please try again...!'}, res);
     }
});
   
router.post('/getone', async (req , res) => {
     const {id} = req.body;
     if(req.token._id && mongoose.Types.ObjectId.isValid(req.token._id)){
       let primary = mongoConnection.useDb(constants.DEFAULT_DB);
       let adminData = await primary.model(constants.MODELS.admins, adminModel).findById(req.token._id).lean();
       if(adminData && adminData != null){
         if(id && id.trim() != '' && mongoose.Types.ObjectId.isValid(id)){
           let sizeData = await primary.model(constants.MODELS.categories, categoriesModel).findById(id).select('_id name path status').lean();
           if(sizeData && sizeData != null){
             return responseManager.onSuccess('Size data...!', sizeData, res);
           }else{
             return responseManager.badrequest({message: 'Invalid id to get size, Please try again...!'}, res);
           }
         }else{
           return responseManager.badrequest({message: 'Invalid id to get size, Please try again...!'}, res);
         }
       }else{
         return responseManager.badrequest({message: 'Invalid token to get admin, Please try again...!'}, res);
       }
     }else{
       return responseManager.badrequest({message: 'Invalid token to get admin, Please try again...!'}, res);
     }
});

router.post('/save' , async (req , res) => {
     const {categoriesid , name , path , status} = req.body;
     if(req.token._id && mongoose.Types.ObjectId.isValid(req.token._id)){
       let primary = mongoConnection.useDb(constants.DEFAULT_DB);
       let adminData = await primary.model(constants.MODELS.admins, adminModel).findById(req.token._id).lean();
       if(adminData && adminData != null){
         if(name && name.trim() != ''){
           if(categoriesid && categoriesid.trim() != '' && mongoose.Types.ObjectId.isValid(categoriesid)){
             let size = await primary.model(constants.MODELS.categories, categoriesModel).findById(categoriesid).lean();
             if(size && size != null){
               let obj = {
                 name: name,
                 path: path,
                 status: (status === true) ? status : false,
                 updatedBy: new mongoose.Types.ObjectId(adminData._id),
                 updatedAt: new Date()
               };
               let updateSize = await primary.model(constants.MODELS.categories, categoriesModel).findByIdAndUpdate(size._id , obj , {returnOriginal: false}).lean();
               return responseManager.onSuccess('Categories data updated successfully...!' , 1 , res);
             }else{
               return responseManager.badrequest({message: 'Invalid id to get size, Please try again...!'}, res);
             }
           }else{
             let obj = {
               name: name,
               path: path,
               status: (status === true) ? status : false,
               createdBy: new mongoose.Types.ObjectId(adminData._id)
             };
             let newSize = await primary.model(constants.MODELS.categories, categoriesModel).create(obj);
             return responseManager.onSuccess('Categories added successfully...!' , 1 , res);
           }
         }else{
           return responseManager.badrequest({message: 'Invalid size name, Please try again...!'}, res);
         }
       }else{
         return responseManager.badrequest({message: 'Invalid token to get admin, Please try again...!'}, res);
       }
     }else{
       return responseManager.badrequest({message: 'Invalid token to get admin, Please try again...!'}, res);
     }
});

router.post('/upload' , filehelper.upload.single('categoriesImages') , async (req , res) => {
     if(req.token._id && mongoose.Types.ObjectId.isValid(req.token._id)){
       let primary = mongoConnection.useDb(constants.DEFAULT_DB);
       let adminData = await primary.model(constants.MODELS.admins , adminModel).findById(req.token._id).lean();
       if(adminData && adminData != null){
         if(req.file){
           if(allowedContentTypes.imagearray.includes(req.file.mimetype)){
             let sizeOfImageInMB = helper.bytesToMB(req.file.size);
             if(sizeOfImageInMB <= 5){
               aws.saveToS3WithName(req.file.buffer , 'Categories' , req.file.mimetype , 'Images').then((result) => {
                 let data = {
                   path: result.data.Key,
                 };
                 return responseManager.onSuccess('Categories image uploaded successfully...!' , data , res);
               }).catch((error) => {
                 return responseManager.onError(error , res);
               });
             }else{
               return responseManager.badrequest({ message: 'Image file must be <= 5 MB, please try again' }, res);
             }
           }else{
             return responseManager.badrequest({ message: 'Invalid file type only image files allowed for profile pic, please try again...!' }, res);
           }
         }else{
           return responseManager.badrequest({ message: 'Invalid file, please try again' }, res);
         }
       }else{
         return responseManager.badrequest({ message: 'Invalid token to get admin, Please try again...!' } , res);
       }
     }else{
       return responseManager.badrequest({ message: 'Invalid token to get admin, Please try again...!' } , res);
     }
});

module.exports = router;