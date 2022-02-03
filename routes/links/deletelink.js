const express = require('express');
const router = express.Router();
const Links = require('../../models/Links');
const fetchuser = require('../../middleware/fetchuser');

router.delete('/:id', fetchuser, async (req, res) => {

    try {
        const { id, username } = req.user;
        const link = await Links.findOne({ id, username });
        if (link.user.toString() !== id) {
            return res.status(400).json({ success: false, message: "Not allowed" });
        }
        if (!link) {
            return res.status(400).json({ success: false, message: "No link available" });
        }
        if (link.links.length == 0) {
            return res.status(400).json({ success: false, message: "No link available" });
        }
        for (let i = 0; i < link.links.length; i++) {
            if (link.links[i]._id == req.params.id) {
                const updateLink = await Links.findOneAndUpdate({ id, username }, { $pull: { links: { _id: req.params.id } } })
                return res.status(201).json({ success: true, message: "Link successfully deleted" });
            }
        }
        return res.status(400).json({ success: false, message: "No link available" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Some internal server error occured!!" })
    }
})


module.exports = router;