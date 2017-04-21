//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Dog = require('./model/saved-dogs');
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://dfafigliolia:dfJan1991a1a@ds161960.mlab.com:61960/df');
//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent dogs
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

//adding the /dogs route to our /api router
router.route('/dogs')
 //retrieve all dogs from the database
 .get(function(req, res) {
 //looks at our dog Schema
	 Dog.find(function(err, dogs) {
		 if (err)
		 	res.send(err);
		 	//responds with a json object of our database dogs.
		 	res.json(dogs)
		 });
	 })
 //post new dog to the database
 .post(function(req, res) {
 	var dog = new Dog();
	 //body parser lets us use the req.body
	dog.dog = req.body.dog;
	dog.dogsize = req.body.dogsize;
	dog.doggender = req.body.doggender;
	dog.dogimg = req.body.dogimg;
	dog.dogid = req.body.dogid;
	dog.save(function(err) {
	if (err)
		res.send(err);
		res.json({ message: 'Dog successfully added!' });
	});
 });
 //Adding a route to a specific dog based on the database ID
router.route('/dogs/:dog_id')
	//The put method gives us the chance to update our dog based on 
	//the ID passed to the route
	 .put(function(req, res) {
	 	Dog.findById(req.params.dog_id, function(err, dog) {
	 		if (err)
	 			res.send(err);
				//setting the new author and text to whatever was changed. If 
				//nothing was changed we will not alter the field.
			 	(req.body.dog) ? dog.dog = req.body.dog : null;
			 	(req.body.dogname) ? dog.dogname = req.body.dogname : null;
			 	//save dog
		dog.save(function(err) {
		 	if (err)
				res.send(err);
		 		res.json({ message: 'Dog has been updated' });
	 	});
 	});
 })
 //delete method for removing a dog from our database
 .delete(function(req, res) {
	 //selects the dog by its ID, then removes it.
	 Dog.remove({ _id: req.params.dog_id }, function(err, dog) {
	 	console.log(req.params.dog_id);
	 	if (err)
	 		res.send(err);
	 		res.json({ message: 'dog has been deleted' })
	 })
 });
//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log('api running on port ' + port );
});