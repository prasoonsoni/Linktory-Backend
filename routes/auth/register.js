const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async(req, res)=>{
    try {
        const {name, username, email, password} = req.body;
        
        let userEmail = await User.findOne({email:email});
        let userUsername = await User.findOne({username:username});

        // if email already exists
        if(userEmail){
            return res.status(400).json({success:false, message:"E-Mail already exists!!"});
        }
        // if username already exixts
        if(userUsername){
            return res.status(400).json({success:false, message:"Username already taken!!"});
        }
        // hashing password
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(password, salt);
        // creating user
        let user = await User.create({
            name:name,
            username:username,
            email:email,
            password:securedPassword
        });
        // generating token
        const data = {
            user:{
                id:user.id,
                username:user.username
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET_KEY);
        res.status(201).json({success:true, authtoken});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message:"Some internal server error occured!!"})
    }
});

module.exports = router;