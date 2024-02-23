const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const passport = require("passport");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const session = require("express-session");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(morgan("combined"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use("/uploads", express.static("uploads"));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "pug");
app.set("views", "./views");

const router = require("./routes/index.route");
const database = require("./config/database");
const initializePassport = require("./middlewares/passport");
initializePassport(
  passport,
  database.getUserByEmail,
  database.getUserById
);

database.connect();
router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
