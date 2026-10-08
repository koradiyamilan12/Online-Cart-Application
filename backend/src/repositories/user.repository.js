const User = require("../models/User");

class UserRepository {
  async findByEmail(email) {
    return User.findOne({
      where: {
        email: String(email).trim().toLowerCase(),
      },
    });
  }

  async findById(id) {
    return User.findByPk(id);
  }

  async create(userData) {
    return User.create(userData);
  }
}

module.exports = new UserRepository();
