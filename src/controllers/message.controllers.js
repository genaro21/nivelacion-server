const models = require("../models");

const create = async (req, res) => {
  try {
    const { userOneId, userTwoId, userOwnerId, text } = req.body;

    if (text.length === 0) {
      return res.json({ err: "mensaje vacío " });
    }

    const userOne = await models.user.findById(userOneId);
    console.log(userOne);
    if (!userOne) {
      return res.json({ err: "UserOne no existe" });
    }

    const userTwo = await models.user.findById(userTwoId);
    if (!userTwo) {
      return res.json({ err: "UserTwo no existe" });
    }
    const userOwner = await models.user.findById(userOwnerId);
    if (!userOwner) {
      return res.json({ err: "UserOwner no existe" });
    }

    let message = null;

    const messages = await models.message.find({
      userOne: userTwo,
      userTwo: userOne,
    });
    if (messages.length === 0) {
      message = await models.message.create({
        userOne,
        userTwo,
        userOwner,
        text,
      });
    } else {
      message = await models.message.create({
        userOne: userTwo,
        userTwo: userOne,
        userOwner,
        text,
      });
    }

    return res.json({ message });
  } catch (err) {
    return res.json({ err });
  }
};

const chat = async (req, res) => {
  try {
    const { userOneId, userTwoId } = req.body;

    const userOne = await models.user.findById(userOneId);
    if (!userOne) {
      return res.json({ err: "El usuasrio no existe" });
    }
    const userTwo = await models.user.findById(userTwoId);
    if (!userTwo) {
      return res.json({ err: "El usuasrio no existe" });
    }

    let result = [];

    const userList1 = await models.message.find({ userOne, userTwo });
    if (userList1.length === 0) {
      const userList2 = await models.message.find({
        userOne: userTwo,
        userTwo: userOne,
      });
      if (userList2.length !== 0) {
        result = userList2;
      }
    } else {
      result = userList1;
    }
    return res.json({ messages: result });
  } catch (err) {
    return res.json({ err });
  }
};

module.exports = {
  create,
  chat,
};
