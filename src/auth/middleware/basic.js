'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ');
  let basicUser = basic.pop();
  let [username, password] = base64.decode(basicUser).split(':');

  try {
    req.user = await users.authenticateBasic(username, password)
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

}

