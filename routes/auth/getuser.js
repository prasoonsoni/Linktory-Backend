require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const fetchuser = require('../../middleware/fetchuser');

router.get('/',fetchuser, async(req,res)=>{
    try {
        const userID = req.user.id;
        const username = req.user.username;
        res.status(201).json({success:true, id:userID, username:username});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message:"Some internal server error occured!!"})
    }
})