const jwt = require ('jsonwebtoken');
const UserModel = require('./Models/user');

const JWT_SECRET = 'OerjfdAPDFOAojdufiwe4rw';

const jwtMiddleware = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer'))
        return res.status(401).json({error: "Unauthorized"});

        const token = authHeader.split(' ')[1];
    // const token = req.headers.authorization.split(' ')[1];
    // if(!token) return
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await UserModel.findById(decoded.id);
        if(!user) return res.status(401).json({ error: "User not found" });

        req.user = user;
        next();
    } catch(err) {
        console.log(err);
        res.status(401).json({error: 'Invalid Token'});
    }
}

const generateToken = (userData) => {
    return jwt.sign(userData, JWT_SECRET, {expiresIn: '8h'});
}

module.exports = {jwtMiddleware, generateToken};