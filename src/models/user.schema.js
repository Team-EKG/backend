// User schema table - includes id(generated), email, password. Foreign keys - User ID, Show ID

'use strict';

const jwt = require('jsonwebtoken');
const SECRET = process.env.API_SECRET || 'ThisIsMySecret';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() { // a method that gets called on read
        return jwt.sign({ username: this.username }, SECRET, { expiresIn: '86400000' })
      },
      set(payload) {  // a method that runs when set with "="
        return jwt.sign(payload, SECRET, { expiresIn: '86400000' })
      }
    }
  })
}

