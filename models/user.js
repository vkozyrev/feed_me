'use strict';

var async = require('async')
  , Promise = require('bluebird')
  , randomBytes = Promise.promisify(require('crypto').randomBytes)
  , pbkdf2 = Promise.promisify(require('crypto').pbkdf2);

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    displayUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activationKey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordKey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      },
      serializeUser: function () {
        return function (user, cb) {
          cb(null, user.get(options.usernameField));
        };
      },
      deserializeUser: function () {
        var self = this;
        return function (username, cb) {
          self.find({ where: { username: self.username }})
          .then(cb)
          .catch(cb)
        };
      }
    },
    instanceMethods: {
      register: function (password) {
        return Promise.bind(this)
        .then(function () {
          return this.Model.find({ where: { username: this.username }})
        })
        .then(function (existingUser) {
          if (existingUser) { throw new Error('Existing_User'); }
          return password;
        }) 
        .then(this.setPassword);
      },
      setPassword: function (password) {
        var options = 
          { saltlen:  32,
            iterations:  12000,
            keylen:  512,
            salt: null
          };

        return Promise.bind(this)
        .then(function () {
          return randomBytes(options.saltlen);
        })
        .then(function (buffer) {
          options.salt = buffer.toString('hex');
          return pbkdf2(password, options.salt, options.iterations, options.keylen);
        })
        .then(function (hashRaw) {
          this.hash = new Buffer(hashRaw, 'binary').toString('hex');
          this.salt = options.salt;
        });
      }
    }
  });
  
  return User;
};