var Sync = require("./lib/sync");
exports = module.exports = Sync;


//Here's a small example:

/*var one = function(msg, cb) {
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

Sync(one).add(two, "Hello").options("World").callback(cb).exec();*/


var one = function(msg, cb) {
	setTimeout(function() {
		console.log(msg);
		cb(msg);
	}, 2500);
}
var two = function(msg1, msg2, cb) {
	setTimeout(function() {
		console.log(msg1);
		console.log(msg2);
		cb(msg1, msg2);
	}, 1000);
}
var cb = function(results) {
	console.log("I'm good!");
	console.log();
	console.log("results:", results);
}
var ex = Sync(two).options("Hello,", "World!").add(one, "How are you?").cb(cb);
Sync.example = ex;