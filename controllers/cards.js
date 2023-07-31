const Card = require('../models/card');
class CardError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
module.exports.getCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(card =>res.send(card))
    .catch(err => next(new CardError("Карточка не найдена",404)));
}
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(next);
}
module.exports.createCard = (req, res, next) => {
  const {name, link} = req.body;
  Card.create({ name, link, owner:req.user._id})
    .then(card => res.send(card))
    .catch(next);
}
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send(card))
    .catch(next);
}
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send(card))
    .catch(next);
}