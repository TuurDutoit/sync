var Sync = require("./lib/sync");
exports = module.exports = Sync;

var one = function(msg, cb) {
	console.log("One began:", msg);
	setTimeout(function() {
		console.log("One ended:", msg);
		cb("One:", msg);
	}, 2300);
}

var two = function(msg, cb) {
	console.log("Two began:", msg);
	setTimeout(function() {
		console.log("Two ended:", msg);
		cb("Two:", msg);
	}, 1000);
}

var cb = function(results) {
	console.log("Everything ended!");
	console.log("Results:");
	console.log(results);
}

Sync(two, one).options("Hello").callback(cb).exec();
