module.exports = app => {
  const user = require('../controllers/controller.js');

  // Create a new User
  app.post('/users', user.create);

  // Retrieve all Users
  app.get('/users', user.findAll);

  // Retrieve a single User with userId
  app.get('/users/:userId', user.findOne);

  // Retrieve a single user with username
  app.get('/users/username/:username', user.findName);

  // Retrieve a single user with email
  app.get('/users/email/:email', user.findEmail);

  // Update a User with userId
  app.put('/users/:userId', user.update);

  // Update a User with userId
  app.put('/users/username/:username', user.updateViaUsername);

  // Delete a User with userId
  app.delete('/users/:userId', user.delete);

  //pretty print
  app.set('json spaces', 2);
};
