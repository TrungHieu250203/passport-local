const authenticatedRoute = require("../routes/authenticated.route");

module.exports = (app) => {
  app.use("/", authenticatedRoute);
};
