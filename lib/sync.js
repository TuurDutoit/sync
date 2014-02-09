//A little setup
require("./setup")();


exports = module.exports = function() {

	var Sync = {
		"_functions": [],
		"cb": function(cb) {
			this._callback = cb;
			return this;
		},
		"callback": function(cb) {
			this._callback = cb;
			return this;
		},
		"options": function() {
			for (var i = 0; i < this._functions.length; i++) {
				var func = this._functions[i];
				if(!func.args) {
					func.args = arguments.toArray();
				}
			}
			return this;
		},
		"add": function(func){
			var args = arguments.toArray();
			args.splice(0,1); //remove func
			this._functions.push({"func": func, "args": args});
			return this;
		},
		"exec": function(cb) {
			if(!this._callback && cb) {
				this._callback = cb;
			}

			var results = [];
			var done = 0;
			var numFuncs = this._functions.length;
			var callback = this._callback;

			for(var i = 0; i < this._functions.length; i++) {
				var func = this._functions[i].func;
				var args = this._functions[i].args;
				var cb = (function(i) {
					return function() {
						results[i] = arguments.toArray();
						done++;
						if(done >= numFuncs) {
							//All done!
							callback(results);
						}
					}
				})(i)
				args.push(cb); 
				func.apply(this, args);
			}
		}
	}

	for (var i = 0; i < arguments.length; i++) {
		Sync._functions.push({"func": arguments[i], "args": false});
	}

	return Sync;
}
