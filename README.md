# project1
first git repository to learn about git
<br>
habit-tracker/
│── public/                # Static files (CSS)
│   ├── styles.css         # Stylesheet
│── views/                 # EJS templates
│   ├── index.ejs          # Homepage
│   ├── login.ejs          # Login Page
│   ├── register.ejs       # Registration Page
│   ├── dashboard.ejs      # User Dashboard
│── models/                # Mongoose Schemas
│   ├── User.js            # User Model
│── config/                # Database Configuration
│   ├── db.js              # MongoDB Connection
│── server.js              # Main Backend File
│── package.json           # Dependencies

npm init -y
npm install express mongoose bcryptjs express-session ejs body-parser

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/habitTracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  profession: String,
  habits: [String],
  reminders: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", UserSchema);

const express = require("express");
const mongoose = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "habitSecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Home Route
app.get("/", (req, res) => {
  res.render("index");
});

// Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.redirect("/dashboard");
  } else {
    res.send("Invalid credentials. Try again.");
  }
});

// Register Page
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { name, age, profession, habits, reminders, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, age, profession, habits: habits.split(','), reminders, email, password: hashedPassword });

  await newUser.save();
  res.redirect("/login");
});

// Dashboard Page
app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("dashboard", { user: req.session.user });
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(3000, () => console.log("Server running on port 3000"));

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Habit Tracker</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <h1>Welcome to Habit Tracker</h1>
    <a href="/register">Register</a> | <a href="/login">Login</a>
</body>
</html>

<form action="/login" method="POST">
    <h2>Login</h2>
    Email: <input type="email" name="email" required><br>
    Password: <input type="password" name="password" required><br>
    <button type="submit">Login</button>
</form>

<form action="/register" method="POST">
    <h2>Register</h2>
    Name: <input type="text" name="name" required><br>
    Age: <input type="number" name="age" required><br>
    Profession: <input type="text" name="profession" required><br>
    Needed Habits (comma-separated): <input type="text" name="habits" required><br>
    Reminders: <input type="text" name="reminders"><br>
    Email: <input type="email" name="email" required><br>
    Password: <input type="password" name="password" required><br>
    <button type="submit">Register</button>
</form>

