const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    userOne: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    userTwo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    userOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Message", messageSchema);
