var users = {};

module.exports = {
  create: function (username, user) {
    users[username] = user;
    return user;
  },
  find: function (username) {
    return users[username]
  },
  findOrCreate: function (username, user) {
    if (this.find(username)) return this.find(username);
    return this.create(username, user);
  }
};