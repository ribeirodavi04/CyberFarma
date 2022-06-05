const jwt = require('jsonwebtoken');
const { promisify } = require('util');;

module.exports = async(req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        const [, token] = authHeader.split(' ');
        const decode = await promisify(jwt.verify)(token, process.env.JWT_KEY);
        req.user = decode;
        return next();
    }catch (error){
        return res.status(401).send({message: "Falha na aaautenticação"});
    }
}