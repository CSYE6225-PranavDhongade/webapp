const User = require("../models/user");
const bcrypt = require('bcrypt');
const atob = require('atob');

const basicAuth = async (req, res, next) => {

    const encodedCredentials = req.headers.authorization;

    const base64Credentials = encodedCredentials.split(' ')[1];
    
    const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    
    const [username, password] = decodedCredentials.split(':');
    
    const userr = await User.findOne({where : { email: username }});

    const emm = await userr.email;

    if (!userr) {
        return null;
    }

    const passwordMatch = await bcrypt.compare(password, userr.password);

    if (!passwordMatch) {
        return null;
    }

    return userr;
}

module.exports = basicAuth;