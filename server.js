if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const port = 5000;
const ip = "127.0.0.1";
const expressLayout = require("express-ejs-layouts"); //layout
const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [];
// render
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

// passport
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
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
app.use(methodOverride("_method"));
//layout模板設定
app.set("layout", "layouts/layout");
app.use(expressLayout);
//接資料庫
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewURLparser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to Mongoose"));
// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });
const indexRouter = require("./routes/index");
const petsRouter = require("./routes/pets");
const usersRouter = require("./routes/user");
const caretakersRouter = require("./routes/caretakers");
const bodyParser = require("body-parser"); //取得表單資料工具

app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

//網頁routers
app.use("/", indexRouter);

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/booking", (req, res) => {
  res.render("booking");
});

// app.get("/caretakers", (req, res) => {
//   res.render("caretakers");
// });

app.use("/caretakers", caretakersRouter);
app.get("/schedule", checkAuthenticated, (req, res) => {
  res.render("schedule");
});
app.get("/cam", checkAuthenticated, (req, res) => {
  res.render("cam");
});

app.use("/pets", petsRouter);
// app.get("/pets", (req, res) => {
//   res.render("pets.ejs");
// });
// users login
app.use("/user", usersRouter);
app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: `/user`,
    failureRedirect: `/login`,
    failureFlash: true,
  })
);

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login");
});
app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register");
});
app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});
app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.listen(process.env.PORT || 3000);
