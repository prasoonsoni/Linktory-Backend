const express = require('express');
const router = express.Router();
const Links = require('../../models/Links');
const fetchuser = require('../../middleware/fetchuser');

router.put('/:id', fetchuser, async (req, res) => {

    try {
        const { id, username } = req.user;
        const {name, link} = req.body;
        const getLink = await Links.findOne({ id, username });
        if (getLink.user.toString() !== id) {
            return res.status(400).json({ success: false, message: "Not allowed" });
        }
        if (!getLink) {
            return res.status(400).json({ success: false, message: "No link available" });
        }
        if (getLink.links.length == 0) {
            return res.status(400).json({ success: false, message: "No link available" });
        }
        for (let i = 0; i < getLink.links.length; i++) {
            if (getLink.links[i]._id == req.params.id) {
                const updateLink = await Links.findOneAndUpdate({ id, username,'links._id':req.params.id }, { $set: { 'links.$.name':name, 'links.$.link':link} })
                return res.status(201).json({ success: true, message: "Link successfully updated" });
            }
        }
        return res.status(400).json({ success: false, message: "No link available" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Some internal server error occured!!" })
    }
})


module.exports = router;