const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require("mongoose");
const Blog = require("./models/blog.js");

// Constants
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));

// DB Connection

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}.`)
})

// Routes

//      GET / Landing Page
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

//      GET /blogs/new
app.get("/blogs/new", async (req, res) => {
    res.render("blogs/new.ejs");
});

//       POST /blogs
app.post("/blogs", async (req, res) => {
    console.log(req.body);
    await Blog.create(req.body);
    res.redirect("/blogs/new");
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});

