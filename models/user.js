'use strict';

var _ = require('lodash')
  , AppErrors = require('../errors')
  , async = require('async')
  , jwt = require('jsonwebtoken')
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
    email: {
      type: DataTypes.STRING,
      allowNull: false
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
          cb(null, user.username);
        };
      },
      deserializeUser: function () {
        var self = this;
        return function (username, cb) {
          self.find({ where: { username: self.username }})
          .then(function (user) {
            return cb(null, user);
          })
          .catch(function (error) {
            return cb(error);
          })
        };
      }
    },
    instanceMethods: {
      register: function (password) {
        return Promise.bind(this)
        .then(function () {
          return this.Model.find({ where: { $or: { username: this.username, email: this.email }}})
        })
        .then(function (existingUser) {
          if (existingUser) { 
            throw (existingUser.email === this.email) ? AppErrors.emailTaken() : AppErrors.usernameTaken();
          }
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
      },
      comparePassword: function (password) {
        var options = 
          { iterations:  12000,
            keylen:  512
          };

        return Promise.bind(this)
        .then(function () {
          return pbkdf2(password, this.salt, options.iterations, options.keylen);
        })
        .then(function (hashRaw) {
          var hash = new Buffer(hashRaw, 'binary').toString('hex');
          if (hash !== this.hash) {
            throw new AppErrors.passwordMismatch();
          }
          return true;
        });
      },
      generateToken: function () {
        // <TODO> move secret to config file
        return jwt.sign({ }, 'secret', { issuer: 'accounts.examplesoft.com', audience: 'yoursite.net', subject: this.id.toString() });
      },
      filter: function () {
        return _.omit(_.pick(this, this.attributes), ['hash', 'salt', 'activationKey', 'resetPasswordKey']);   
      }
    }
  });
  
  return User;
};