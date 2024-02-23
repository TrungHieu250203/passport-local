const mongoose = require("mongoose");
const Account = require("../models/account.model");

module.exports.connect = async () => {
  try {
    const data = await mongoose.connect("mongodb://127.0.0.1:27017/NodeAuth");
    console.log("Success");
  } catch (err) {
    console.error(err);
  }
};

module.exports.getUserByEmail = async (email) => {
  try {
    return await Account.findOne({ email: email });
  } catch (err) {
    console.error(err);
  }
};

module.exports.getUserById = async (id) => {
  try {
    return await Account.findById(id);
  } catch (err) {
    console.error(err);
  }
};
