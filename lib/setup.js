exports = module.exports = function() {
	Object.prototype.toArray = function() {
		var array = [];
		var keys = Object.keys(this);
		for(var i = 0; i < keys.length; i++) {
			array[i] = this[keys[i]];
		}

		return array;
	}
}