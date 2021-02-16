const packages = require("./init.js");
const Sequelize = require("sequelize");

let app = packages.app;
let sequelize = packages.sequelize;
let port = packages.port;

const Post = sequelize.define("post", {
  author: Sequelize.STRING,
  date: Sequelize.DATE,
  content: Sequelize.TEXT,
  title: Sequelize.STRING,
  coverPicture: Sequelize.STRING,
  //TAGS
});

const Tag = sequelize.define("tag", {
  name: Sequelize.STRING,
});

// CRUD
/* Post
    author: Sequelize.STRING, 
    date: Sequelize.DATE,
    content: Sequelize.TEXT,
    title: Sequelize.STRING,
    //TAGS 
*/

app.post("/master/post", function (req, res) {
  Post.create({
    author: req.body.author,
    date: req.body.date,
    content: req.body.content,
    title: req.body.title,
    coverPicture: req.body.coverPicture,
  }).then((post) => res.json(post));
});

app.get("/post", function (req, res) {
  Post.findAll({
    limit: req.query.limit,
    offset: req.query.offset,
  }).then((post) => res.json(post));
});

app.get("/postCount", (req, res) => {
  Post.count().then((count) => res.json(count));
});

app.get("/post/:id", function (req, res) {
  Post.findByPk(req.params.id).then((post) => res.json(post));
});

app.put("/master/post", function (req, res) {
  let post = Post.findAll().then((post) => res.json(post))[0];
  post
    .update({
      author: req.body.author,
      date: req.body.date,
      content: req.body.content,
      title: req.body.title,
      coverPicture: req.body.coverPicture,
    })
    .then((post) => res.json(post));
});

app.delete("/master/post/:id", function (req, res) {
  Post.findByPk(req.params.id)
    .then(function (post) {
      post.destroy();
    })
    .then((post) => {
      res.sendStatus(200);
    });
});

/*TAG 
    name: Sequelize.STRING
*/

app.post("/tag", function (req, res) {
  Tag.create({
    name: req.body.name,
  }).then((tag) => res.json(tag));
});

app.get("/tag", function (req, res) {
  Tag.findAll().then((tag) => res.json(tag));
});

app.put("/tag", function (req, res) {
  let tag = Tag.findAll().then((tag) => res.json(tag))[0];
  tag
    .update({
      name: req.body.name,
    })
    .then((tag) => res.json(tag));
});

app.delete("/tag/:id", function (req, res) {
  Tag.findByPk(req.params.id)
    .then(function (tag) {
      tag.destroy();
    })
    .then((tag) => {
      res.sendStatus(200);
    });
});
