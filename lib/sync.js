//A little setup
require("./setup")();



exports = module.exports = function() {

	var Sync = {
		"cb": function(cb) {
			this._callback = cb;
			return this;
		},
		"callback": function(cb) {
			this._callback = cb;
			return this;
		},
		"options": function(options) {
			this._options = options;
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
				var func = this._functions[i];
				func(this._options, (function(i) {
					return function() {
						results[i] = arguments.toArray();
						done++;
						if(done >= numFuncs) {
							//All done!
							callback(results);
						}
					}
				})(i)
				);
			}
		}
	}



	Sync._functions = arguments.toArray()

	return Sync;
}