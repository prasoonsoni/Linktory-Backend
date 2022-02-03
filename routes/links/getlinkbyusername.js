const express = require('express');
const { links } = require('express/lib/response');
const router = express.Router();
const Links = require('../../models/Links');
const Users = require('../../models/Users');
router.get('/:username', async(req,res)=>{
    try {
        const username = req.params.username;
        const user = await Users.findOne({username});
        const links = await Links.findOne({username});
        if(!user){
            return res.status(400).json({success:false, message:"No user available."});
        }
        if(links.link.length==0){
            return res.status(400).json({success:false, message:"No links available."});
        }
        res.status(201).json({success:true,username:username, links:links.links});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message:"Some internal server error occured!!"})
    }
});

module.exports = router;