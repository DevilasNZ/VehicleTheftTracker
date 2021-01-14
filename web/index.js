const express = require ('express');
const mysql = require('mysql');
const app = express();

app.use( express.static( "public" ) );



//------------------------------------------------------------------------------
//establish SQL connection.
var env = process.env.NODE_ENV || 'development';
console.log("connecting to MySQL with " + env + " credentials...");
var config = require('./config')[env];

let con = mysql.createPool(config.database);

//------------------------------------------------------------------------------
//the home page.

app.get('/',(req, res) => {
  res.render('index.ejs');
  return;
});

//------------------------------------------------------------------------------
//Last Day Data

//GET JSON of top model list for last week.
app.get('/last-week-make-model-count.json', (req, res) => {
  let query = "SELECT `make`, `model`, COUNT(*) AS `magnitude` FROM `vehicles` WHERE `date` > NOW() - INTERVAL 7 DAY GROUP BY `make`,`model` ORDER BY `magnitude` DESC LIMIT 10;"

  // execute query
  con.query(query, (err, result) => {
      if (err) {
        console.log("there was an issue with querying the database for a term.")
        console.log(err.message)
        res.redirect('/');
        return;
      }
      res.send(result)
      return;
  });
});

//GET JSON of top make list for last week.
app.get('/last-week-make-count.json', (req, res) => {
  let query = "SELECT `make`, COUNT(*) AS `magnitude` FROM `vehicles` WHERE `date` > NOW() - INTERVAL 7 DAY GROUP BY `make` ORDER BY `magnitude` DESC LIMIT 10;"

  // execute query
  con.query(query, (err, result) => {
      if (err) {
        console.log("there was an issue with querying the database for a term.")
        console.log(err.message)
        res.redirect('/');
        return;
      }
      res.send(result)
      return;
  });
});

//GET JSON of top vehicle type list for last week.
app.get('/last-week-type-count.json', (req, res) => {
  let query = "SELECT `type`, COUNT(*) AS `magnitude` FROM `vehicles` WHERE `date` > NOW() - INTERVAL 7 DAY GROUP BY `type` ORDER BY `magnitude` DESC LIMIT 10;"

  // execute query
  con.query(query, (err, result) => {
      if (err) {
        console.log("there was an issue with querying the database for a term.")
        console.log(err.message)
        res.redirect('/');
        return;
      }
      res.send(result)
      return;
  });
});

//GET JSON of top location list for last week.
app.get('/last-week-location-count.json', (req, res) => {
  let query = "SELECT `location`, COUNT(*) AS `magnitude` FROM `vehicles` WHERE `date` > NOW() - INTERVAL 7 DAY GROUP BY `location` ORDER BY `magnitude` DESC;"

  // execute query
  con.query(query, (err, result) => {
      if (err) {
        console.log("there was an issue with querying the database for a term.")
        console.log(err.message)
        res.redirect('/');
        return;
      }
      res.send(result)
      return;
  });
});

//------------------------------------------------------------------------------
//Last Month Data

//GET JSON of top model list for last day.
app.get('/last-month-make-model-count.json', (req, res) => {
  let query = "SELECT `make`, `model`, COUNT(*) AS `magnitude` FROM `vehicles` WHERE `date` > NOW() - INTERVAL 30 DAY GROUP BY `make`,`model` ORDER BY `magnitude` DESC LIMIT 10;"

  // execute query
  con.query(query, (err, result) => {
      if (err) {
        console.log("there was an issue with querying the database for a term.")
        console.log(err.message)
        res.redirect('/');
        return;
      }
      res.send(result)
      return;
  });
});

//GET JSON of top make list for last day.
app.get('/last-month-make-count.json', (req, res) => {
  let query = "SELECT `make`, COUNT(*) AS `magnitude` FROM `vehicles` WHERE `date` > NOW() - INTERVAL 30 DAY GROUP BY `make` ORDER BY `magnitude` DESC LIMIT 10;"

  // execute query
  con.query(query, (err, result) => {
      if (err) {
        console.log("there was an issue with querying the database for a term.")
        console.log(err.message)
        res.redirect('/');
        return;
      }
      res.send(result)
      return;
  });
});

//GET JSON of top vehicle type list for last day.
app.get('/last-month-type-count.json', (req, res) => {
  let query = "SELECT `type`, COUNT(*) AS `magnitude` FROM `vehicles` WHERE `date` > NOW() - INTERVAL 30 DAY GROUP BY `type` ORDER BY `magnitude` DESC LIMIT 10;"

  // execute query
  con.query(query, (err, result) => {
      if (err) {
        console.log("there was an issue with querying the database for a term.")
        console.log(err.message)
        res.redirect('/');
        return;
      }
      res.send(result)
      return;
  });
});

//GET JSON of top location list for last day.
app.get('/last-month-location-count.json', (req, res) => {
  let query = "SELECT `location`, COUNT(*) AS `magnitude` FROM `vehicles` WHERE `date` > NOW() - INTERVAL 30 DAY GROUP BY `location` ORDER BY `magnitude` DESC;"

  // execute query
  con.query(query, (err, result) => {
      if (err) {
        console.log("there was an issue with querying the database for a term.")
        console.log(err.message)
        res.redirect('/');
        return;
      }
      res.send(result)
      return;
  });
});

//------------------------------------------------------------------------------
//All Time Data.

//GET JSON of top model list of all time.
app.get('/all-time-make-model-count.json', (req, res) => {
  let query = "SELECT `make`, `model`, COUNT(*) AS `magnitude` FROM `vehicles` GROUP BY `make`,`model` ORDER BY `magnitude` DESC LIMIT 10;"

  // execute query
  con.query(query, (err, result) => {
      if (err) {
        console.log("there was an issue with querying the database for a term.")
        console.log(err.message)
        res.redirect('/');
        return;
      }
      res.send(result)
      return;
  });
});

//GET JSON of top make list of all time.
app.get('/all-time-make-count.json', (req, res) => {
  let query = "SELECT `make`, COUNT(*) AS `magnitude` FROM `vehicles` GROUP BY `make` ORDER BY `magnitude` DESC LIMIT 10;"

  // execute query
  con.query(query, (err, result) => {
      if (err) {
        console.log("there was an issue with querying the database for a term.")
        console.log(err.message)
        res.redirect('/');
        return;
      }
      res.send(result)
      return;
  });
});

//GET JSON of top vehicle type list of all time.
app.get('/all-time-type-count.json', (req, res) => {
  let query = "SELECT `type`, COUNT(*) AS `magnitude` FROM `vehicles` GROUP BY `type` ORDER BY `magnitude` DESC LIMIT 10;"

  // execute query
  con.query(query, (err, result) => {
      if (err) {
        console.log("there was an issue with querying the database for a term.")
        console.log(err.message)
        res.redirect('/');
        return;
      }
      res.send(result)
      return;
  });
});

//GET JSON of top location list of all time.
app.get('/all-time-location-count.json', (req, res) => {
  let query = "SELECT `location`, COUNT(*) AS `magnitude` FROM `vehicles` GROUP BY `location` ORDER BY `magnitude` DESC;"

  // execute query
  con.query(query, (err, result) => {
      if (err) {
        console.log("there was an issue with querying the database for a term.")
        console.log(err.message)
        res.redirect('/');
        return;
      }
      res.send(result)
      return;
  });
});

//GET JSON data of the last 1000 stolen vehicles.
app.get('/last-1000.json', (req, res) => {
  let query = "SELECT `rego`,`make`,`model`,`year`,`colour`,`date`,`location` FROM Vehicle_Theft_Tracker.vehicles ORDER BY date desc LIMIT 1000;"

  // execute query
  con.query(query, (err, result) => {
      if (err) {
        console.log("there was an issue with querying the database for a term.")
        console.log(err.message)
        res.redirect('/');
        return;
      }
      res.send(result)
      return;
  });
});

//------------------------------------------------------------------------------

app.listen(3000, () => console.log('listening on port 3002'))
