//A little setup
require("./setup")();


exports = module.exports = function Sync() {

	this._functions =  [];
	this.cb =  function(cb) {
		this._callback = cb;
		return this;
	};
	this.callback =  function(cb) {
		this._callback = cb;
		return this;
	};
	this.options = function() {
		for (var i = 0; i < this._functions.length; i++) {
			var func = this._functions[i];
			if(!func.args) {
				func.args = arguments.toArray();
			}
		}
		return this;
	};
	this.add = function(func, args){
		this._functions.push({"func": func, "args": args});
		return this;
	};
	this.exec = function(cb) {
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

	for (var i = 0; i < arguments.length; i++) {
		this._functions.push({"func": arguments[i], "args": false});
	}

	return this;
}
