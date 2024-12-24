const mongoConnection = require('../../../utilities/connections');
const constants = require('../../../utilities/constants');
const helper = require('../../../utilities/helper');
const responseManager = require('../../../utilities/response.manager');
const adminModel = require('../../../models/admin/admin.model');
exports.login = async (req , res) => {
    console.log("hhh");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {email , password} = req.body;
    if(email && email != null && email.trim() != '' && password && password != null && password.trim() != ''){
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let admin = await primary.model(constants.MODELS.admins , adminModel).findOne({email : email}).lean();
        if(admin && admin != null){
            // let decPassword = await helper.passwordDecryptor(admin.password);
            if(admin.password == password){
                let accessToken =   await helper.generateAccessToken({_id: admin._id});
                return responseManager.onSuccess('Admin login successfully...!',{accessToken: accessToken} , res);
            }else{
                return responseManager.badrequest({ message: 'Invalid email or password, Please try again...!' }, res);
            }
        }else{
            return responseManager.badrequest({ message: 'Invalid email or password, Please try again...!' }, res);
        }
    }else{
        return responseManager.badrequest({ message: 'Invalid email or password, Please try again...!' }, res);
    }
};