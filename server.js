const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { port, mongoURI } = require("./config");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const User = require("./models/Users");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const transactionRoute = require("./routes/transactions");
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const categoriesRoute = require("./routes/categories");
const lessonRoute = require("./routes/lesson");

//webRTC dependencies
const svelteViewEngine = require("svelte-view-engine");

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "secret key",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/transactions", transactionRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/lesson", lessonRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
  });
}

app.listen(port, () => {
  console.log("Listening on " + port);
});
