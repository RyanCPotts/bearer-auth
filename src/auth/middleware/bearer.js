'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login') }
    console.log(req.headers.authorization);
    
    const token = req.headers.authorization.split(' ').pop();
    console.log('Token', token)
    const validUser = await users.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;

    next();

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
}
