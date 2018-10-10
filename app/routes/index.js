
const noteRoutes = require('./note_routes')

module.exports = function(app, db) {
	app.get('/', function(req, res) {
	  	res.send("This is Working :3")
	});

	noteRoutes(app, db)
	//other routes here
}