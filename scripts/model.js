(function() {

var ns = mico;

/*
 * unit of micro-content
 */

ns.Mico = function(title, options) {
	options = options || {};
	this.id = ns.util.generateID();
	this.title = title;
	this.type = options.type || "text/plain"; // XXX: custom type?
	this.body = options.body || null;
};

/*
 * collection of MicoS
 */

ns.Collection = function(micos) {
	micos = micos || [];
	this.index = {};
	this.linkmap = {}; // XXX: rename?
	for(var i = 0; i < micos.length; i++) {
		this.put(micos[i]);
	}
	this.length = micos.length; // pseudo-array
};

ns.Collection.prototype = new Array();

ns.Collection.prototype.get = function(title) {
	var id = this.linkmap[title];
	return this[this.index[id]];
};

ns.Collection.prototype.put = function(mico) {
	this.push(mico);
	this.index[mico.id] = this.length - 1;
	if(this.linkmap[mico.title] === undefined) {
		this.linkmap[mico.title] = [];
	}
	this.linkmap[mico.title].push(mico.id);
};

ns.Collection.prototype.delete = function(id) {
	var i = this.index[id];
	if(i === undefined) {
		return false;
	}
	var title = this[i].title;
	delete this.index[id];
	delete this.linkmap[title];
	var mico = this.splice(i, 1)[0];
	for(var key in this.index) { // update index references -- XXX: inefficient!?
		if(this.index[key] > i) {
			this.index[key]--;
		}
	}
	return mico;
};

ns.Collection.prototype.filter = function(field, value, invert) {
	if(arguments.length == 1 && typeof arguments[0] == "function") { // XXX: hacky?
		var check = arguments[0];
	} else if(invert) {
		check = function(a, b) { return a !== b; };
	} else {
		check = function(a, b) { return a === b; };
	}
	var matches = jQuery.map(this, function(mico, i) {
		return check(mico[field], value) ? mico : null;
	});
	return new ns.Collection(matches);
};

ns.Collection.prototype.setAttr = function(field, value) {
	for(var i = 0; i < this.length; i++) {
		this[i][field] = value;
	};
	return this;
};

})();
