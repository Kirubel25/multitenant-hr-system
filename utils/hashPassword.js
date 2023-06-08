const bcrypt = require("bcryptjs");

/**
 * file to hash password during signup
 */
const hash = (pswd) => {
  return bcrypt.hashSync(pswd, 10);
};

// export hashed passwored
module.exports = hash;
