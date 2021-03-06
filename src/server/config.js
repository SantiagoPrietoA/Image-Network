const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const multer = require("multer");
const errorHandler = require("errorhandler");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
const app = express();

// setings
app.set("port", process.env.PORT || 3001);
app.set("views", path.join(__dirname, "../views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    helpers: require("./helpers"),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.use(
  multer({ dest: path.join(__dirname, "../public/upload/temp") }).single(
    "image"
  )
);
// middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static files
app.use("/public", express.static(path.join(__dirname, "../public")));

// routes

app.use("/", require("../routes/index"));

// errorhandler
if ("development" === app.get("env")) {
  app.use(errorHandler());
}

module.exports = app;
