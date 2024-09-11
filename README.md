# Model-View-Controller (MVC): Tech Blog

## Description

This application built a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. This app follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

- Live page link: https://techblog-ch3e.onrender.com/
- Screenshot: <br><br>
  <img src="/Assets/Tech Blog.png" width="350" title="page screenshot">

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

- Ensure that Node.js & postgres sql are installed on your machine.
- Clone the repository to your local machine.
- Run `npm install` to install the necessary dependencies (bcrypt, connect-session-sequelize, express,express handlebars, express session, pg,squelize & dotenv).

## Usage

1. Open your terminal and navigate to the project directory.
2. Update `connection.js` to add your db name, postgres username & pasword to be connected to a database using Sequelize.
3. Run the command `psql -U postgres -f db/schema.sql` to create a new db.
4. Run the command `npm run seed` to seed sample data.
5. Run the command `npm start`to invoke the application locally.

## License

This project is licensed under MIT.

## Contributing

Happy to have your contribution! Simply fork the repo and submit a pull request.

## Tests

Manual tests ran for this application.

## Questions

For questions, please contact me on GitHub at [wendyydxiao](https://github.com/wendyydxiao) or email me at wendyxiao1023@gmail.com.
