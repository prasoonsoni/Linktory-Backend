const express = require('express');
const router = express.Router();
const Links = require('../../models/Links');
const fetchuser = require('../../middleware/fetchuser');

router.post('/', fetchuser, async(req,res)=>{
    try {
        const {name, link} = req.body;
        const {id, username} = req.user;

        const linkAvailable = await Links.findOne({id, username});
        if(linkAvailable){
            const linkToPush = await Links.findOneAndUpdate({id, username}, {$push:{links:{name,link}}});
            return res.status(201).json({success:true, message:"Link successfully added"});
        }
        const addNewLink = await Links.create({
            id:id,
            username:username,
            links:[{name,link}]
        });
        return res.status(201).json({success:true, message:"Link successfully added"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message:"Some internal server error occured!!"})
    }
})

module.exports = router;