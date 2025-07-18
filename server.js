const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}.`)
})

const Blog = require("./models/blog.js");

// GET / Landing Page
app.get("/", async (req, res) => {
res.render("index.ejs");
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});