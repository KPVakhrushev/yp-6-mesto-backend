const User = require('../models/user');
class UserError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then(user =>res.send(user))
    .catch(err => next(new UserError("Пользователь не найден",404)));
}
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(users => res.send(users))
    .catch(next);
}

module.exports.updateUser = (req, res, next) => {
  const {name, about} = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about}, { new: true })
    .then(user => res.send(user))
    .catch(next);
}
module.exports.updateAvatar = (req, res, next) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar}, { new: true })
    .then(user => res.send(user))
    .catch(next);
}