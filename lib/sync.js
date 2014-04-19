exports = module.exports = function Sync() {

	this._functions =  [];
	this.cb = function(cb) {
		this._callback = cb;
		return this;
	};
	this.callback =  function(cb) {
		this._callback = cb;
		return this;
	};
	this.options = function(args) {
		this._arguments = args;
		return this;
	};
	this.arguments = function(args) {
		this._arguments = args;
		return this;
	};
	this.args = function(args) {
		this._arguments = args;
		return this;
	}
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
		var error = false;
		var numFuncs = this._functions.length;
		var callback = this._callback;

		for(var i = 0; i < this._functions.length; i++) {
			var func = this._functions[i].func;
			var args = this._functions[i].args || this._arguments || [];
			var cb = (function(i) {
				return function(err) {
					if(err instanceof Error) {
						error = true;
						return callback(err);
					}
					else if(!error) {
						results[i] = [];
						for(key in arguments) {
						    results[i].push(arguments[key]);
						}
						done++;
						if(done >= numFuncs) {
							//All done!
							callback(null, results);
						}
					}
				}
			})(i)
			args.push(cb); 
			func.apply(this, args);
		}
	}

	for (var i = 0; i < arguments.length; i++) {
		this._functions.push({"func": arguments[i], "args": []});
	}

	return this;
}
