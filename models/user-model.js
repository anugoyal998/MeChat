const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    phone: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: false},
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
