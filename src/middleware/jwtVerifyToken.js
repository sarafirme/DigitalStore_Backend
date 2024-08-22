const jwt = require('jsonwebtoken');

const JwtVerifyToken = (request, response, next) => {
    let token = request.headers.authorization ? request.headers.authorization.split(' ') : '';
    token = token ? token[1] : '';

    if (!token){
        return response.json({message: "Token inválido!", sucess: false})
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(error) {
        console.log(error.message);
        response.status(403);
        return response.status(403).json({
            message: "Usuario não autorizado"
        });
    }

    next();
}

module.exports = JwtVerifyToken;