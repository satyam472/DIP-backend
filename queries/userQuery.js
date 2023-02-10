
const UserModel = require('../models/userModel');
const {encryptPassword, decryptPassword } = require('../functions/encryption')

const loginUserQuery = async(req,body) => {

    try{
        console.log(body)
        const user = await UserModel.findOne({email_id:body.email_id});
        if(user){
            let checkPassword = decryptPassword(body.password,user.password);
            if(checkPassword){
                req.session.user = user; 
                req.session.save(err => {
                    if(err){
                        console.log(err);
                    } else {
                        console.log("session is saved")
                    }
                });
                return Promise.resolve({status:true,msg:"login successfully",session:req.session});
            }
            else{
                return Promise.resolve({status:false,msg:"password is incorrect"});
            }
        }
        else{
            return Promise.resolve({status:false,msg:"please first rigister then try to login"});
        }
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}

const registerUserQuery = async(req,body)=>{
    try{
        console.log(body)
        let encryptpassword = encryptPassword(body.password);
        let doc = {
            first_name: body.first_name,
            last_name: body.last_name ,
            email_id: body.email_id,
            password: encryptpassword,
        }
        const user = await UserModel.create(doc);
        console.log(user)
        req.session.user = user;
        req.session.save(err => {
            if(err){
                console.log(err);
            } else {
                console.log("session is saved")
            }
        });
        return Promise.resolve({ status: true,msg:"registration complited",session:req.session})
    }
    catch(err){
        return Promise.reject({status:false,msg:"please try different emailId"})
    }
}

module.exports = {
    loginUserQuery,
    registerUserQuery
}