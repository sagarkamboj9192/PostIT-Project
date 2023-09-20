const {verify} = require('jsonwebtoken');

const validateToken = (req, res , next)=>{
    const accessToken= req.header("accessToken");
    if(!accessToken){
        return res.json({error : "You are not a valid user"});
    }
    try {
        const validToken = verify(accessToken , "Keepthistokenasasecret");
        req.user = validToken;
        if(validToken){
            return next();
        }
        
    } catch (error) {
        return res.json({error : err});
    }
}

module.exports={validateToken};