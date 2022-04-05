const jwt = require('jsonwebtoken');

module.exports = function verify(req, res, next){
    const token = req.header('x-auth-token');
    // token = token.replace(/^Bearer\s+/, "");
    // console.log(req.get('auth-token'));
    // console.log(req.header('Authorization'));
    if(!token) return res.status(401).send('Assess Denied !');
    try {
        const verified = jwt.verify(token, "private_token");
        console.log(verified);
        req.employees = verified;
        next(); 
    } catch (error) {
        res.status(400).send(error);
    }
} 