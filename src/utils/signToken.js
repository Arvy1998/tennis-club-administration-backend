import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs';

const signToken = async (user) => {
  const privatekey = fs.readFileSync(`${__dirname}/../ssl/service.key`);

  const payload = {
    userId: user._id,
    email: user.email,
    password: user.password,
    role: user.role,
  };

  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(payload, privatekey, { expiresIn: '1h' }, (error, token) => {
      if (error) reject(error);
      else resolve(token);
    });
  });
};

export default signToken;
