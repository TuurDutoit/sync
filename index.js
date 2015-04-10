var EventEmitter = require("events").EventEmitter;
var util = require("util");





var copyArray = function(arr) {
    var res = [];
    for(var i = 0, len = arr.length; i < len; i++) {
        res[i] = arr[i];
    }
    
    return res;
}






var Sync = function() {
    if(this === GLOBAL) {
        return new this(arguments);
    }
    
    this.__functions = [];
    
    this.add(arguments);
    
    return this;
}

util.inherits(Sync, EventEmitter);


Sync.prototype.add = function(func, args) {
    if(typeof func === "function") {
        this.__functions.push({func: func, args: args});
    }
    else {
        for(var i = 0, len = func.length; i < len; i++) {
            this.add(func[i], args);
        }
    }
    
    return this;
}


Sync.prototype.arguments = Sync.prototype.args = Sync.prototype.options = function(args) {
    this.__defaultArgs = args;
    
    return this;
}


Sync.prototype.execute = Sync.prototype.exec = function(cb) {
    var self = this;
    if(cb) {
        this.on("done", cb);
    }
    if(!this.__defaultArgs) {
        this.__defaultArgs = [];
    }
    
    var results = [];
    var done = 0;
    var error = false;
    var numFuncs = this.__functions.length;
    
    for(var i = 0; i < numFuncs; i++) {
        var func = this.__functions[i].func;
        var args = this.__functions[i].args || this.__defaultArgs.slice(0);
        var j = i;
        var cb = function(err) {
            if(!error && done < numFuncs) {
                if(err instanceof Error) {
                    error = true;
                    self.emit("done", err);
                    return;
                }
                
                results[j] = copyArray(arguments);
                done++;
                
                if(done === numFuncs) {
                    self.emit("done", err);
                }
            }
        }
        
        args.push(cb);
        
        try {
            func.apply(GLOBAL || null, args);
        }
        catch (e) {
            error = true;
            self.emit("done", err);
            return;
        }
    }
}





module.exports = Sync;