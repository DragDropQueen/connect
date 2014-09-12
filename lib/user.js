var _ = require('lodash');
var db = require('./database');

var users = {};

module.exports = {
  create: function (username, user, callback) {
    db.save(username, user, callback);
  },
  find: function (username, callback) {
    db.get(username, callback);
  },
  findOrCreate: function (username, user, callback) {
    var self = this;
    db.get(username, function (err, res) {
      if (err && err.error === 'not_found') {
        self.create(username, user['_json'], callback)
      }
      callback(err, user['_json']);
    });
  },
  update: function (username, data, callback) {
    db.get(username, function (err, record) {
      var user = _.extend(record, data);
      db.save(username, record._rev, user, callback);
    });
  }
};