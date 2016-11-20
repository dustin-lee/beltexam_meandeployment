// this is our friends.js file located at /server/controllers/friends.js
// note the immediate function and the object that is returned
// First add the following two lines at the top of the friends controller so that we can access our model through var Friend
// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
var User = mongoose.model('User');
var BucketList = mongoose.model('BucketList')
module.exports = {
    register: function(req,res){
        console.log("In my users");
        if (req.body.password != req.body.pw_confirm){
            res.sendStatus(400);
        }else{
            var user = new User(req.body);
            user.save(function(err,user){
                if (err){
                    console.log('There were validation errors:', err)
                    res.json(err);
                }else{
                    req.session.user = {
                      name: user.name,
                      _id: user._id
                    }
                    res.sendStatus(200);
                }
            });
        }
   },
  login:function(req,res){
    var errors = {errors:{
      general:{
        message:'Invalid login information'
      }
    }}
    User.findOne({email:req.body.email}).exec(function(err,user){
      if(!req.body.email||!req.body.password || !user){
        res.json(errors)
      }else{
        if(user.password != req.body.password){
          res.json(errors);
        }else{
            req.session.user = {
              name: user.name,
              _id: user._id
            }
            res.send(user);
        }
      }
    })
  },
  getCurrent: function(req,res){
    User.findOne({_id: req.session.user._id}).exec(function(err, user){
      if(err){
        res.sendStatus(400);
      }else{
        var u = {
            name:user.name,
           _id:user._id
         }
        res.json(u)
      }
    })
  },
  logout : function(req,res){
  User.findOne({_id: req.session.userId}).exec(function(err, user){
    if (err){
      res.status(500).send("Failure");
    } else{
      req.session.destroy(function(){
        req.session=null;
      })
      res.json(user);
    }
})
},
getusers : function(req,res){
  console.log('getting users from server')
  User.find({}, function(err, users){
    console.log('find anything for users?')
    if (err) {
      res.sendStatus(500)
    }else {
      res.json(users)
    }
  })
},
// show : function (req, res){
//   User.findOne({_id: req.params.id}).exec(function(err, user){
//     if (err){
//       res.status(500).send("Failure");
//     } else{
//       console.log("Showing a user");
//       res.json(user);
//     }
// })
// },
// showAll: function(req,res){
//   BucketList.find({}).populate({path'_tagged', model: "User"}).exec(function(err, buckets){
//     if(err){
//       console.log("unable to grab everything");
//       res.sendStatus(404);
//     } else{
//       console.log("found everything");
//       res.json(buckets);
//     }
//   })
// }
show : function (req, res){
console.log(req.params.id)
BucketList.find({"$or":[{user: req.body.user}, {tagged: req.body.user}]}).populate('user').exec(function(err, buckets){
    if (err){
      res.status(500).send("Failure");
    } else{
      console.log("Showing a user");
      res.json(buckets);
    }
})
},
}
