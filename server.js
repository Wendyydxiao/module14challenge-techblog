const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const homeRoutes = require('./controllers/homeRoutes');
const apiRoutes = require('./controllers/api');
const userRoutes = require('./controllers/api/userRoutes');

const app = express();
const PORT = process.env.PORT || 3001;


const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(session({
  secret: 'Super secret secret',
  store: new SequelizeStore({
    db: sequelize,
  }),
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', homeRoutes);
app.use('/api', apiRoutes);
app.use('/user', userRoutes); 
app.use('/profile', userRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
