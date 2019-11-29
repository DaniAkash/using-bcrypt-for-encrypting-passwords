const bcrypt = require("bcrypt");
const saltRounds = 10;

const generateHash = plainTextPassword => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainTextPassword, saltRounds, 
      (err, hash) => {
        if(err) {
          //failure
          reject(err);
        } else {
          //success
          resolve(hash);
        }
      })
  });
};

const compareHash = (plainTextPassword, passwordHash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPassword, passwordHash, 
      (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    )
  });
};

const passwordString = "mypassword";
generateHash(passwordString)
  .then(encryptedPassword => {
    console.log("encrypted password -", encryptedPassword);
    compareHash(passwordString, encryptedPassword)
      .then(result => console.log(result))
      .catch(err => console.error(err));
  })
  .catch(err => {
    console.error(err);
  });
