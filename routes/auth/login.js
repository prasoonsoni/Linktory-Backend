const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.use('/', async(req, res)=>{
    try {
        const {email, password} = req.body;
        // checking if user exists or not
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message:"User doesn't exists!!"});
        }
        // checking entered password and database password
        const passwordMatch = await bcrypt.compare(password, user.password);
        // if no match
        if(!passwordMatch){
            return res.status(400).json({success:false, message:"Invalid password!!"});
        }
        // generating token
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET_KEY);
        res.status(201).json({success:true, authtoken});

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Some internal server error occured!!"})
    }
});
module.exports = router;