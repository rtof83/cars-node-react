const { app } = require('./database/conn');
const cors = require('cors');

app.use(cors());

const models = require('./models');
const methods = require('./methods');
const routes = [ '/cars', '/stores', '/brands', '/users' ];

const checkAdminExists = require('./middlewares/checkAdminExists');

// mount standard routes
for (let i = 0; i < routes.length; i++) {
  // for each method
  for (let j = 0; j < methods.length; j++) {
    methods[j](routes[i], models[i]);
  };
};


// custom routes

// login to sign token
require('./routes/checkUserRoute')('/login');

// validate access
require('./routes/checkValidate')('/validate');

// verify if any admin exists on database
checkAdminExists();
