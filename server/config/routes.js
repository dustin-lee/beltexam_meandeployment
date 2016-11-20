// This is our routes.js file located in server/config/routes.js
// This is where we will define all of our routing rules!
// We will have to require this in the server.js file (and pass it app!)
// First, at the top of your routes.js file you'll have to require the controller
var users = require('./../controllers/users.js');
var buckets = require('./../controllers/bucketlists.js')
module.exports = function(app) {
	app.post('/login', users.login)
	app.post('/users', users.register)
	app.post('/addingbuckets', buckets.addbucket)
	app.get('/getbuckets', buckets.getBuckets)
	app.get('/getusers', users.getusers)
	app.get('/user/:id/', users.show)
	// app.get('/getpeeps', buckets.showAll)
	// middleware is declared to be used here
	app.use(userAuth);
	app.post('/logout', users.logout);
	app.get('/currentUser', users.getCurrent)
};

//userAuth middleware
function userAuth(req,res,next){
	if (req.session.user){
		next();
	}else{
		res.sendStatus(401);
	}
}
