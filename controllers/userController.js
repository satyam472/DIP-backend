
const {loginUserQuery, registerUserQuery } = require('../queries/userQuery')


const loginUser = async(req,res) => {
    try {
        await loginUserQuery(req,req.body.body)
        .then((resp) => {
            res.cookie(`Cookie token name`,`encrypted cookie string Value`,{
                maxAge: 5000,
                // expires works the same as the maxAge
                expires: new Date('01 12 2021'),
                // secure: true,
                // httpOnly: true,
                sameSite: 'lax'
            });
            res.status(200).json(resp);
        });
        
    } catch (error) {
        console.log(error);
    }
}

const registerUser = async(req,res)=>{
    try {
        await registerUserQuery(req,req.body.body)
        .then((resp) => {
            res.status(200).json(resp);
        });
        
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    loginUser,
    registerUser
}