const jwt = require("jsonwebtoken");

const sendToken = (id)=> {
    return jwt.sign(id, process.env.SECRET_KEY, {
        expiresIn: "1h",
    });
}


module.exports = sendToken;
