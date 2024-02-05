const User = require("../models/user");
const bcrypt = require('bcrypt');
const atob = require('atob');

const basicAuth = async (req, res, next) => {

    const encodedCredentials = req.headers.authorization;

    const decodedCredentials = atob(encodedCredentials.split(" ")[1]);
    
    const [username, password] = decodedCredentials.split(':');

    const userr = await User.findOne({ email: username });

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