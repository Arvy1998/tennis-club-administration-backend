import jwt, { TokenExpiredError } from 'jsonwebtoken';
import fs from 'fs';

//import UserNotAuthorized from 'errors/UserNotAuthorized';

const verifyToken = async (request) => {
  const privatekey = fs.readFileSync(`${__dirname}/../ssl/service.key`);

  const token = request.headers.authorization;

  //if (!token) throw new UserNotAuthorized();

  return new Promise((resolve) => {
    jwt.verify(token.split(' ')[1], privatekey, (error, user) => {
      if (error instanceof TokenExpiredError) throw new TokenExpiredError();
      //else if (error) throw new UserNotAuthorized();
      else resolve(user);
    });
  });
};

export default verifyToken;