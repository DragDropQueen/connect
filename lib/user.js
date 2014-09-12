var _ = require('lodash');
var database = require('./database');

var users = {};

module.exports = {
  create: function (username, user, callback) {
    database.save(username, user, callback);
  },
  find: function (username, callback) {
    database.get(username, callback);
  },
  findOrCreate: function (username, user, callback) {
    var self = this;
    database.get(username, function (err, res) {
      if (err && err.error === 'not_found') {
        self.create(username, user['_json'], callback)
      }
      callback(err, user['_json']);
    });
  },
  update: function (username, data, callback) {
    database.get(username, function (err, record) {
      var user = _.extend(record, data);
      database.save(username, record._rev, user, callback);
    });
  }
};