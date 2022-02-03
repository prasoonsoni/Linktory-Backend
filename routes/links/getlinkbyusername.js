const express = require('express');
const router = express.Router();
const Links = require('../../models/Links');
router.get('/:username', async(req,res)=>{
    try {
        const username = req.params.username;
        const links = await Links.findOne({username});
        if(!links){
            return res.status(400).json({success:false, message:"No user available."});
        }
        res.status(201).json({success:true,username:username, links:links.links});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message:"Some internal server error occured!!"})
    }
});

module.exports = router;