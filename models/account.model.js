const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
