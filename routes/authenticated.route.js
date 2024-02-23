const express = require("express");
const router = express.Router();
const passport = require("passport");

const controller = require("../controllers/authenticated.controller");
const { checkAuthenticated, checkNotAuthenticated } = require("../middlewares/authenticated");
const upload = require("../middlewares/multer");

router.get("/", checkAuthenticated, controller.index);

router.get("/register", checkNotAuthenticated, controller.registerInterface);
router.post("/register", checkNotAuthenticated, upload.single("avatar"), controller.register);

router.get("/login", checkNotAuthenticated, controller.login);

router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.post("/logout", controller.logout);

module.exports = router;
