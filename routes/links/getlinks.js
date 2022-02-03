const express = require('express');
const router = express.Router();
const Links = require('../../models/Links');
const fetchuser = require('../../middleware/fetchuser');
router.get('/', fetchuser, async(req,res)=>{
    try {
        const {id, username} = req.user;
        const links = await Links.findOne({id, username});
        if(!links){
            return res.status(400).json({success:false, message:"No links available"});
        }
        if(!links.links.length==0){
            return res.status(400).json({success:false, message:"No links available"});
        }
        res.status(201).json({success:true,username:username, links:links.links});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message:"Some internal server error occured!!"})
    }
});

module.exports = router;