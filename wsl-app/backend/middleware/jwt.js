import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

const verifyToken = (req, res, next) =>{
    //console.log("Cookies received: ", req.cookies);
    const token = req.cookies.accessToken;
    if(!token) return next(createError(401,"You are not authenticated!"));

    jwt.verify(token, process.env.JWT_KEY, async(err, payload)=>{
        if(err) return next(createError(403,"Token isn't valid!"));
        req.userId = payload.id;
        req.isBusiness = payload.isBusiness;
        next();
    });
 
};

export default verifyToken;