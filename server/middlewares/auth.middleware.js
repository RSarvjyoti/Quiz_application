const jwt = require('jsonwebtoken');
const Blocklist = require('../models/blocklist.model');

const isAuth = async (req, res, next) => {
    try{
        const authHeader = req.headers["authorization"];
        if(!authHeader){
            res.status(401).json({message: "authorization header missing."});
        }

        // Beerer token format
        const token = authHeader.split(" ")[1];
        if(!token){
            res.status(401).json({message: "Token missing"});
        }

        // now i need to check is blocked token or not

        const blocklist = await Blocklist.findOne({token});
        if(blocklist){
            return res.status(401).json({message : "Token has been loged out"});
        }

        //  now verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(403).json({message:"Invalid or expired token"})
            }
            req.user = decoded;
            next();
        });

    }catch(err){
        console.log('Auth middleware error', err);
        res.status(500).json({message :"Internal server error"});
    }
}

module.exports = isAuth;