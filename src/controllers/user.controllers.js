const models = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config");

const create = async (req, res) => {
  try {
    const user = await models.user.create(req.body);
    return res.json({ user });
  } catch (err) {
    return res.json({ err });
  }
};

const all = async (req, res) => {
  try {
    const data = jwt.verify(req.headers.token, config.jwt.secret);
    const users = await models.user.find({ _id: { $ne: data.user._id } }); //TODO: todos menos yo
    return res.json({ users });
  } catch (err) {
    return res.json({ err });
  }
};

const login = async (req, res) => {
  try {
    const user = await models.user.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ error: "User no existe" });
    }
    if (user.password !== req.body.password) {
      return res.json({ error: "User no existe" });
    }
    const token = jwt.sign({ user }, config.jwt.secret);
    return res.json({ token, userId: user._id });
  } catch (err) {
    return res.json({ err });
  }
};

module.exports = {
  create,
  all,
  login,
};
