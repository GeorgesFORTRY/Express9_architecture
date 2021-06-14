const connection = require('./db-config');
require('dotenv').config();
const express = require('express');
const Joi = require('joi');
const { setupRoutes } = require('./routes');
const app = express();

const port = process.env.PORT || 5050;

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log(
      'connected to database with threadId :  ' + connection.threadId
    );
  }
});

app.use(express.json());

setupRoutes(app);

app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  connection.query(
    'DELETE FROM users WHERE id = ?',
    [userId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('😱 Error deleting an user');
      } else {
        res.status(200).send('🎉 User deleted!');
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
