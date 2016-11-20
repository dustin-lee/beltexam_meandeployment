console.log('bucketlists server controllers');

var mongoose = require('mongoose');
var BucketList = mongoose.model('BucketList');
var User = mongoose.model('User');
var Status = mongoose.model('Status');

module.exports = {
  // addbucket :  function(req, res){
  //   console.log('in the serverbuckets')
  //   var newBucket = new BucketList(req.body);
  //   newBucket.user = req.session.user._id
  //   newBucket._tagged.push(req.body._tagged)
  //   // bucket.user = req.params.id;
  //   // newBucket.save(function(err,bucket){
  //   newBucket.save(function(err){
  //     user.buckets.push(newBucket);
  //     user.save(function(err){
  //       var status = new Status(user._id, newBucket._id);
  //       status.user = user;
  //       satus.newBucket = bucket;
  //       satus.save(function(err){
  //           if (err){
  //             console.log("there was an error in creating a bucket list", err)
  //             res.json(err);
  //           }else{
  //             console.log("you made a bucket list")
  //             res.json(newBucket)
  //             req.session.user = user;
              // BucketList.find({_id: bucket._tagged}, function(err,data){
              //   if(err){
              //     console.log("tagged error 222", err)
              //   }else {
              //     // res.sendStatus(201)
              //     res.json(data);
              //   }
              // })
          //   }
          //   })
          // })
        // BucketList.findOne({_tagged: bucket._tagged}, function(err, bucket){
        //   if(err){
        //     res.json(err)
        //   }else{
        //     console.log('we made it bud')
        //     res.json(bucket);
            // BucketList._buckets.push(bucket._id)
            // BucketList.save(function(err,results){
              // if(err){
              //   res.json(error)
              // }else {
              //   console.log('wemade it fam')
              //   res.json(bucket);
              // }
            // })
        //   }
        // })
      // }
  //   })
  // },
  addbucket : function(req, res){
    User.findOne({_id: req.session.user._id}, function(err, user){
    if(err){
       return res.sendStatus('500');
    }else{
    console.log('in the serverbuckets');
    var newBucket = new BucketList(req.body);
    newBucket.user = req.session.user.id;
    newBucket.tagged.push(req.body.tagged)
    newBucket.save(function(err){
      user._buckets.push(newBucket);
      user.save(function(err){
        var newStatus = new Status(user._id, newBucket._id);
        newStatus.user = user;
        newStatus.bucketlist = newBucket;
        newStatus.save(function(err){
          if(err){
            console.log('error in creating bucket');
            return res.sendStatus('400');
          } else {
            console.log("you made a bucket list")
            req.session.user = user;
            res.json(newBucket);
          }
       })
    })
 })
 }
})
},
  getBuckets : function(req,res){
    console.log('getting buckets from server')
    BucketList.find({}, function(err, buckets){
      console.log('find anything?')
      if (err) {
        res.sendStatus(500)
      }else {
        res.json(buckets)
      }
    })
  },




}
