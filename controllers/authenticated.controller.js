const bcrypt = require("bcrypt");
const Account = require("../models/account.model");

module.exports.index = async (req, res) => {
  res.render("pages/home", {
    pageTitle: "Home",
  });
};

module.exports.registerInterface = async (req, res) => {
  res.render("pages/register", {
    pageTitle: "Register",
  });
};

module.exports.register = async (req, res) => {
  const { username, email, phone, password } = req.body;
  const [passwordInit, confirmPassword] = password;
  const error = [];

  if (passwordInit !== confirmPassword) {
    error.push({ message: "Invalid password" });
  }

  if (passwordInit.length < 6) {
    error.push({
      message: "The number of characters must be greater than or equal to 6",
    });
  }

  const hashedPassword = await bcrypt.hash(passwordInit, 10);

  if (error.length === 0) {
    const data = {
      username: username,
      email: email,
      phone: phone,
      password: hashedPassword,
    };

    const account = new Account(data);
    await account.save();
    res.redirect("/login");
  } else {
    res.status(401).send({ message: "Error" });
  }
}

module.exports.login = async (req, res) => {
  res.render("pages/login", {
    pageTitle: "Login",
  });
};

module.exports.logout = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};
