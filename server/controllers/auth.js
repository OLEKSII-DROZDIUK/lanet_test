const bCrypt = require('bcrypt');
const mongoose = require("mongoose");

const User = require("../db/models/User");
const hashPassHelper = require("../helpers/hashPassHelper");

const delUser = async (req, res) => {
    const { login, password } = req.body;

    try {
        await User.findOne({login:login})
        .exec()
        .then((user) => {
            if(!user) {
                res.status(401).json({ message: "Цей логін не зареєстрований"});
            } 
            
            const isValid = bCrypt.compareSync(password, user.password);  
            
            if(isValid) {
                user
                .remove()
                .then(
                    res.status(200).json({
                        userDel: true
                    })
                )
            }  else {  
                res.status(401).json({ message: "Невірний пароль"});
            }
        })
    } catch(error) {
        //can add some save in file
        console.log("log error in server33: ", error.message)
    }
}

const singIn = async (req, res) => {
    const { login, password } = req.body.data;
    
    try {
        await User.findOne({login:login})
        .exec()
        .then((user) => {
            if(!user) {
                res.status(401).json({ message: "Цей логін не зареєстрований"}); 
            } 
            const isValid = bCrypt.compareSync(password, user.password); 
            
            if(isValid) {
                res.status(200).json({
                    loginIs: true
                })
            }  else {  
                res.status(401).json({ message: "Невірний пароль"});
            }
        })
    } catch(error) {
        //can add some save in file
        console.log("log error in server59: ", error.message)
    }
}

const userRegister = (req, res) => {
    const { login, password } = req.body.data;

    try {
        const hashPasswordFromUser = hashPassHelper.generateHashPassword(password);

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            password: hashPasswordFromUser,
            login: login,
        });

        User.findOne({login: login})
        .exec(function(error, user){
            if(!user){
                User.create(newUser)
            } else { 
                res.status(401).json({ message: "Цей логін вже зареєстрований"});
            }
        })
    } catch(error) {
        //can add some save in file
        console.log("log error in server84: ", error.message)
    }
};

const checkUser = async(userData) => {
    let userStatus = {loginIs:false, passwordIs:false}
    const { login, password } = userData;

    try {
        await User.findOne({login:login})
        .exec()
        .then((user) => {
            
            const isValid = bCrypt.compareSync(password, user.password);  
            
            if(isValid) {
                userStatus = {loginIs:true, passwordIs:true};
            }  else {  
                userStatus = userStatus = {loginIs:true, passwordIs:false};
            }
        })
    } catch(error) {
        userStatus = {loginIs:false, passwordIs:false}
    }

    return userStatus;
}

module.exports = {
    singIn,
    userRegister,
    delUser,
    checkUser
};