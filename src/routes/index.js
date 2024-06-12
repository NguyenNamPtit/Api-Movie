const UserRouter = require("./UserRouter");
const FilmRouter = require("./FilmRouter");
const BlogRouter = require("./BlogRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/film", FilmRouter);
  app.use("/api/blog", BlogRouter);
};

module.exports = routes;
