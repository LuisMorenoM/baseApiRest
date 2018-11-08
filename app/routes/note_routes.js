
let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

	// get all
	app.get('/notes', (req, res) => {
		db.collection('notes').find({}).toArray( (err, items) => {
			res.send(JSON.stringify(items))
		});
	})

	//get 1 - findOne
	app.get('/notes/:id', (req, res) => {
		const id = req.params.id
		const details = {
			'_id' : new ObjectID(id)
		}

		db.collection('notes').findOne(details, (err, item) => {
	      	if (err) {
	        	res.send({'error':'An error has occurred'});
	      	} else {
	      		if (item) {
					res.send(item)
	      		} else {
	      			res.send("Nothing here")
	      		}
	      	} 
	    });
	})

	//post
	app.post('/notes', (req, res) => {
		console.log("post")
		const note = { 
			text: req.body.body, 
			title: req.body.title 
		}

		db.collection('notes').insertOne(note, (err, result) => {
			if (err) { 
	      	  	res.send({ 'error': 'An error has occurred' }); 
	      	} else {
		      	res.send(result.ops[0]);
		    }
		})
	})

	//delete
	app.delete('/notes/:id', (req, res) => {
		const id = req.params.id
		const details = {
			'_id' : new ObjectID(id)
		}

		db.collection('notes').deleteOne(details, (err, item) => {
	      	if (err) {
	        	res.send({'error':'An error has occurred'});
	      	} else {
	        	res.send('Note ' + id + ' deleted');
	      	} 
	    });
	})

	//update
	app.put('/notes/:id', (req, res) => {
		const id = req.params.id
		const details = {
			'_id' : new ObjectID(id)
		}
		const note = { 
			text: req.body.body, 
			title: req.body.title 
		}

		db.collection('notes').update(details, note, (err, result) => {
			if (err) { 
	      	  	res.send({ 'error': 'An error has occurred' }); 
	      	} else {
		      	res.send(note);
		    }
		})
	})
}