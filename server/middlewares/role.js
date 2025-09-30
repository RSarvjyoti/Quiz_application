const checkRole = (...allowRoles) => {
    return (req, res, next) => {
        if(!req.user || !allowRoles.includes(req.user.role)){
            return res.status(403).json({message : "You don't have access."});
        };
        next();
    }
}

module.exports = checkRole