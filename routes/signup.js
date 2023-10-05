var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const config = require('../config');

router.get('/', function(req, res, next) {
  res.sendFile('signup.html', {root: './views'});
});

router.post('/', function(req, res, next) {
  const userEmail = req.body.email;
  const userName = req.body.username;
  const userPassword = req.body.password;
  const confirmPassword = req.body.confirmpassword;

  if (userPassword === confirmPassword) {
    const connection = mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.dataBasePassword,
      database: config.dataBase
    });

    connection.query(
      `INSERT INTO userdatabase (userEmail, userName, userPassword) VALUES ("${userEmail}", "${userName}", "${userPassword}");`,
      function(err, results, fields) {
        if (err) {
          console.error('Помилка запиту:', err);
          return;
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
      }
    )

    connection.end();
  }
})

module.exports = router;
