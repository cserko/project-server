const packages = require('./init.js');

let app = packages.app;
let sequelize = packages.sequelize; 
let port = packages.port;

const Backbone = require('./Backbone.js');
const Post = require('./Post.js');



sequelize.sync({ force: false })
.then(() => {
  console.log(`Database & tables created!`);
});



app.listen(port, () => console.log(`pwp-app listening on port ${port}!`));

