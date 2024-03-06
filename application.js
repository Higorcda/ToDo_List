
const express     =            require('express');
const { engine }  = require('express-handlebars');
const session     =    require('express-session');
const flash       =      require('connect-flash');
const body_parser =        require('body-parser');
const path        =               require('path');
const dotenv      =             require('dotenv');

const application = express();

/* Router */ global.router = express.Router();

dotenv.config();

application.use
(
    session({ secret: process.env.SERVER_SESSION_SECRET_KEY, resave: true, saveUninitialized: true })
);

application.use(flash());

application.use( (request, response, next) => 
{

    response.locals.success = request.flash('success');
    response.locals.failure = request.flash('failure');

    next();

});

application.engine(  'handlebars', engine());
application.set('view engine', 'handlebars');

application.use(body_parser.urlencoded({ extended: false }));
application.use(                         body_parser.json());

application.use(express.static(path.join(__dirname, process.env.SERVER_STATIC_FOLDER)));

/* Routes */

require('./routes/index.js');

/* Routes - Tasks */

/* Routes - Tasks - Categories */

require( './routes/tasks/categories/get_categories.js');
require(   './routes/tasks/categories/add_category.js');
require(  './routes/tasks/categories/edit_category.js');
require('./routes/tasks/categories/delete_category.js');

/* --------- */

require(         './routes/tasks/get_tasks.js');
require(          './routes/tasks/add_task.js');
require(         './routes/tasks/edit_task.js');
require(       './routes/tasks/delete_task.js');
require('./routes/tasks/update_task_status.js');

/* ------ */

application.use('/', global.router);

/* --- */

application.listen
(
    process.env.SERVER_LISTENING_PORT, console.log(`\nServer Listening on ${process.env.SERVER_LISTENING_PORT} Port`)
);