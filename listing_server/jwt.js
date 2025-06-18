const jwt = require ('jsonwebtoken');
const UserModel = require('./Models/user');

const JWT_SECRET = 'OerjfdAPDFOAojdufiwe4rw';


const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // now req.user._id is available
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


const generateToken = (userData) => {
    return jwt.sign(userData, JWT_SECRET, {expiresIn: '8h'});
}

module.exports = {jwtMiddleware, generateToken};

/*const jwtMiddleware = async (req, res, next) =>{
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
*/ 