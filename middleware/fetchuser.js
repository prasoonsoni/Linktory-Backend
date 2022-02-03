const jwt = require('jsonwebtoken');

const fetchuser = async(req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({success:false, message:"Authentication token not valid!!"});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(500).json({success:false, message:"Some internal server error occured!!"})
    }
}
module.exports = fetchuser;