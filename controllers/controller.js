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

// Find a single user
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

// Update via Id
exports.update = (req, res) => {
  if(!req.body) {
       return res.status(400).send({
           message: "User content can not be empty"
       });
   }

   // Find user and update it with the request body
   User.findByIdAndUpdate(req.params.userId, {
       req
   }, {new: true})
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
