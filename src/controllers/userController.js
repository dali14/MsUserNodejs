const User = require('../models/User');

// find all  user

exports.all=('/',(req,res) => {
    User.find()
    .then(user=>res.status(200).json(user))
    .then(err=>res.status(400).json({error:err.message}));

});


//create user

exports.create = (req, res) => {
    // Step 1: Save the data to the database
    const user = new User({
        ...req.body
      });
      user.save(user, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error');
      } else {
            res.send('Data saved successfully');
      }
    });
  };


exports.GetUser = function getUser(call, cb) {
    const { id } = call.request;
  
    User.findOne({_id: id }, (error, res) => {
        console.log(id);
        console.log(res);
        if (error) {
          return cb(err, null);
        } else {

          if (res.nom == null) return cb(new Error("user not found"), null);
          const response = {
            user: {
              nom: res.nom,
              prenom: res.prenom,
              id : res._id,
            },
          };
          return cb(null, response);
        }
      }
    );
  };


  exports.CreateUser =function(call, callback) {
    // Create user object from call request
    const user = call.request;
    console.log(user);
    user.save(user, (err, result) => {
        if (err) {
          console.error(err);
          result.status(500).send('Error');
          return callback(err ,null);
        } else {
              result.send('Data saved successfully')
              //return callback(null, { message: 'User created successfully', user });
              return callback(null, result);
        }
      });
    
  }