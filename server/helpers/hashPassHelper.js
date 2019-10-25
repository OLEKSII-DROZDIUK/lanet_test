const bCrypt = require('bcrypt');

const generateHashPassword = (password) => {

    const salt = Number(process.env.BCRYPT_SALT);
    const hashUserPass = bCrypt.hashSync(password, bCrypt.genSaltSync(salt));

    return hashUserPass;
}


module.exports = {
    generateHashPassword,
}