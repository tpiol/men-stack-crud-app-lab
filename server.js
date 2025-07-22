const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const Blog = require("./models/blog.js");

// Constants
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

// DB Connection

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}.`)
})

// Routes

//      GET / Landing Page / Index
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

//      GET /blogs / Index
app.get("/blogs", async (req, res) => {
   const allBlogs = await Blog.find();
   res.render("blogs/index.ejs", { blogs: allBlogs });
});


//      GET /blogs/new / New
app.get("/blogs/new", async (req, res) => {
    res.render("blogs/new.ejs");
});
sessionStorage
//       POST /blogs / Create
app.post("/blogs", async (req, res) => {    
    console.log(req.body);
    await Blog.create(req.body);
    res.redirect("/blogs/");
});

//      GET /blogs/:blogId / Show
app.get("/blogs/:blogId", async (req, res) => {
   const foundBlog = await Blog.findById(req.params.blogId);
   res.render("blogs/show.ejs", { blog: foundBlog });
});


//       GET /blogs/:blogId/edit / Edit
app.get("/blogs/:blogId/edit", async (req, res) => {
    const foundBlog = await Blog.findById(req.params.blogId);
   res.render("blogs/edit.ejs", {
    blog: foundBlog,
   });
});

//      PUT /blogs/:id / Update
app.put("/blogs/:blogId", async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.blogId, req.body)
    res.redirect(`/blogs/${req.params.blogId}`);
});

//      DELETE  / Delete
app.delete("/blogs/:blogId", async (req, res) => {
    await Blog.findByIdAndDelete(req.params.blogId);
    res.redirect("/blogs");
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});

