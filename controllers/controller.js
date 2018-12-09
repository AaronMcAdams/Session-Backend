const User = require('../models/model.js');

// Create and Save
exports.create = (req, res) => {
  if(!req.body) {
      return res.status(400).send({
          message: "entry content can not be empty"
      });
  }

// Create a new User
const user = new User({ user: req.body });

//Save
user.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the entry."
    });
  });
};

// Retrieve and return
exports.findAll = (req, res) => {
  User.find()
  .then(users => {
      res.send(users);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving the data."
      });
  });
};

// Find a single user via id
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "No User with given Id: " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Find a single user via name
exports.findName = (req, res) => {
  const username = (req.path.split('/')[3]).toString()
  User.find({"user.username": username})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "No User with given username: " + username
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with username" + username
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with username " + username
        });
    });
};

// Find a single user via email
exports.findEmail = (req, res) => {
  const email = (req.path.split('/')[3]).toString()
  User.find({"user.email": email})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "No User with given email: " + email
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with email" + email
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with username " + email
        });
    });
};

// Update via Id
exports.update = (req, res) => {
  if(!req.body) {
       return res.status(400).send({
           message: "User content can not be empty"
       });
   }
   const field = "user." + Object.entries(req.body)[0][0];
   const value = Object.entries(req.body)[0][1];
   let set = {};
   set[field] = value;

   // Find user and update it with the request body via id
   User.findByIdAndUpdate(req.params.userId, {$set: set}, {new: true})
   .then(user => {
       if(!user) {
           return res.status(404).send({
               message: "User not found with id " + req.params.userId
           });
       }
       res.send(user);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "User not found with id " + req.params.userId
           });
       }
       return res.status(500).send({
           message: "Error updating user with id " + req.params.userId
       });
   });
};

// Update via username
exports.updateViaUsername = (req, res) => {
  const username = (req.originalUrl.split('/')[3]).toString()
  if(!req.body) {
       return res.status(400).send({
           message: "User content can not be empty"
       });
    }
    const field = "user." + Object.entries(req.body)[0][0];
    const value = Object.entries(req.body)[0][1];
    let set = {};
    set[field] = value;
    User.find({"user.username": username})
      .then(user => {
          if(!user) {
              return res.status(404).send({
                  message: "No User with given username: " + username
              });
          }
          User.findByIdAndUpdate(user[0]._id, {$set: set}, {new: true})
          .then(user => {
              if(!user) {
                  return res.status(404).send({
                      message: "User not found with id " + req.params.userId
                  });
              }
              res.send(user);
          }).catch(err => {
              if(err.kind === 'ObjectId') {
                  return res.status(404).send({
                      message: "User not found with id " + req.params.userId
                  });
              }
              return res.status(500).send({
                  message: "Error updating user with id " + req.params.userId
              });
          });
       });
};

// Delete via Id
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
  .then(user => {
    if(!user) {
        return res.status(404).send({
            message: "User not found with id " + req.params.userId
        });
    }
    res.send({message: "User deleted successfully!"});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
            message: "User not found with id " + req.params.userId
        });
    }
    return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId
    });
  });
};
