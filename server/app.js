const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

const db = require("./db/config/index");
const router = require("./routes");


const app = express();
const PORT = 3000;
dotenv.config();

app.set("view engine", "ejs");

// Connect database
db.connect();

// Config passport-js
require('./configuration/passport')(passport);

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //Parse cookie
app.use(bodyParser.urlencoded({ extended: false })); //Parse body để get data
app.use(bodyParser.json())
app.use(session({
    secret: "keyboard cat", key: "sid", saveUninitialized: true,
    resave: false,
})); //Save user login

// Setting for passport-js
app.use(passport.initialize());
app.use(passport.session());

// Route init
app.use("/api", router)

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
