const models = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config");

const create = async (req, res) => {
  // try {
  // const user = await models.user.create(req.body);

  // return res.json({ user });

  //   } catch (err) {
  //     return res.json({ err });
  //   }
  // };
  const { email, password1, password2 } = req.body;
  if (!email || !password1 || !password2) {
    console.log("campos llenos por favor");
    return res.json("Rellena todos los campos");
  } else if (password1 !== password2) {
    return res.json("Los password no coinciden");
  }
  const user = {
    email,
    password: password1,
  };
  console.log({ user });
  await models.user.create(user);
  return res.json(req.body);
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

    if (!user) {
      return res.json({ error: "User no existe" });
    }
    if (user.password !== req.body.password) {
      return res.json({ error: "Password no existe" });
    }
    const token = jwt.sign({ user }, config.jwt.secret);
    console.log(token);
    return res.json({
      token: token,
      userId: user._id,
      admin: user.admin,
    });
  } catch (err) {
    return res.json({ err });
  }
};
const remove = async (req, res) => {
  const { id } = req.params;

  const user = await models.user.findOneAndRemove({ _id: id });
  res.json({ user });
  return res.json("user deleted");
};

module.exports = {
  create,
  all,
  login,
  remove,
};
