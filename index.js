var Sync = require("./lib/sync");
exports = module.exports = Sync;


// var one = function(msg, cb) {
// 	console.log("one:", msg);
// 	setTimeout(function() {
// 		console.log("one ended last");
// 		cb("Hello from func 1");
// 	}, 1000);
// }
// var two = function(msg, cb) {
// 	console.log("two:", msg);
// 	setTimeout(function() {
// 		console.log("two ended first");
// 		if(msg === "error") {
// 			cb(new Error("Error!!!"));
// 		}
// 		else {
// 			cb("Hello from func 2", "A second hello");
// 		}
// 	}, 500);
// }
// var cb = function(err, res) {
// 	console.log("error:", err);
// 	console.log("result:", res);
// }
// var s = new Sync()
// s.add(one, ["is ok"]);
// s.add(two);
// s.args(["is also ok"]); //change the string to "error" to test error handling
// s.cb(cb);
// s.exec();