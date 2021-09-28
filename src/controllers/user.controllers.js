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
    // console.log("hola", req.headers);
    const token = req.headers.token;
    console.log(token);
    const data = jwt.verify(req.headers.token, config.jwt.secret);
    console.log(data);
    const users = await models.user.find({ _id: { $ne: data.user._id } }); //TODO: todos menos yo
    return res.json({ users });
  } catch (err) {
    console.log(err);
    return res.json({ err });
  }
};

const login = async (req, res) => {
  try {
    const user = await models.user.findOne({ email: req.body.email });
    console.log("hola");
    if (!user) {
      return res.json({ error: "User no existe" });
    }
    if (user.password !== req.body.password) {
      return res.json({ error: "Password no existe" });
    }
    const token = jwt.sign({ user }, config.jwt.secret);
    console.log(token);
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
