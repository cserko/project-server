const init = require("./init.js"),
  app = init.app,
  sequelize = init.sequelize,
  Sequelize = init.Sequelize,
  port = init.port;

const Backbone = sequelize.define("backbone", {
  name: Sequelize.STRING,
  profile_picture: Sequelize.STRING,
  short_about: Sequelize.STRING,
  about: Sequelize.TEXT,
  //CONTACTS
  //TIMELINE
});

const Timeline = sequelize.define("timeline", {
  header: Sequelize.STRING,
  date: Sequelize.STRING,
  description: Sequelize.TEXT,
});

const Contact = sequelize.define("contact", {
  description: Sequelize.STRING,
  icon: Sequelize.STRING,
  address: Sequelize.STRING,
});

//TODO: Imolement relationships.
//backbone.hasOne(timeline);
//backbone.hasMany(contact);

// Implement CRUD

app.post("/master/backbone", function (req, res) {
  Backbone.create({
    name: req.body.name,
    profile_picture: req.body.profile_picture,
    short_about: req.body.short_about,
    about: req.body.about,
  }).then(function (backbone) {
    res.json(backbone);
  });
});

app.get("/backbone", function (req, res) {
  Backbone.findAll().then((backbone) => res.json(backbone));
});

app.put("/master/backbone/:id", function (req, res) {
  Backbone.findByPk(req.params.id).then(function (backbone) {
    backbone
      .update({
        name: req.body.name,
        profile_picture: req.body.profile_picture,
        short_about: req.body.short_about,
        about: req.body.about,
      })
      .then((backbone) => {
        res.json(backbone);
      });
  });
});

app.delete("/master/backbone/:id", function (req, res) {
  Backbone.findByPk(req.params.id)
    .then(function (backbone) {
      backbone.destroy();
    })
    .then((backbone) => {
      res.sendStatus(200);
    });
});

// Timeline

/*
    header: Sequelize.STRING,
    date: Sequelize.DATE,
    description: Sequelize.TEXT
*/

app.post("/master/timeline", function (req, res) {
  Timeline.create({
    header: req.body.header,
    date: req.body.date,
    description: req.body.description,
  }).then((timeline) => res.json(timeline));
});

app.get("/timeline", function (req, res) {
  Timeline.findAll().then((timeline) => res.json(timeline));
});

app.put("/master/timeline/:id", function (req, res) {
  console.log("PUUTY");
  Timeline.findByPk(req.params.id).then(function (timeline) {
    timeline
      .update({
        header: req.body.header,
        date: req.body.date,
        description: req.body.description,
      })
      .then((timeline) => {
        res.json(timeline);
      });
  });
});

app.delete("/master/timeline/:id", function (req, res) {
  Timeline.findByPk(req.params.id)
    .then(function (timeline) {
      timeline.destroy();
    })
    .then((timeline) => {
      res.sendStatus(200);
    });
});

/* Contact 
    
    description: Sequelize.STRING,
    icon: Sequelize.STRING,
    address: Sequelize.STRING
*/

app.post("/master/contact", function (req, res) {
  Contact.create({
    description: req.body.description,
    icon: req.body.icon,
    address: req.body.address,
  }).then((contact) => res.json(contact));
});

app.get("/contact", function (req, res) {
  Contact.findAll().then((contact) => res.json(contact));
});

app.put("/master/contact/:id", function (req, res) {
  Contact.findByPk(req.params.id).then(function (contact) {
    contact
      .update({
        description: req.body.description,
        icon: req.body.icon,
        address: req.body.address,
      })
      .then((contact) => {
        res.json(contact);
      });
  });
});

app.delete("/master/contact/:id", function (req, res) {
  Contact.findByPk(req.params.id)
    .then(function (contact) {
      contact.destroy();
    })
    .then((contact) => {
      res.sendStatus(200);
    });
});

module.exports = Backbone;
