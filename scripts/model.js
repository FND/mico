/*
 * unit of micro-content
 */

var Mico = function(title) {
	this.id = generateID();
	this.title = title;
};

/*
 * collection of MicoS
 */

var Collection = function(micos) {
	micos = micos || [];
	this.index = {};
	this.linkmap = {}; // XXX: rename?
	for(var i = 0; i < micos.length; i++) {
		this.add(micos[i]);
	}
	this.length = micos.length; // pseudo-array
};

Collection.prototype = new Array();

Collection.prototype.add = function(mico) {
	this.push(mico);
	this.index[mico.id] = this.length - 1;
	if(this.linkmap[mico.title] === undefined) {
		this.linkmap[mico.title] = [];
	}
	this.linkmap[mico.title].push(mico.id);
};

Collection.prototype.remove = function(id) {
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

// XXX: experimental
Collection.prototype.filter = function(field, value, invert) {
	if(invert) {
		var check = function(a, b) { return a !== b; };
	} else {
		check = function(a, b) { return a === b; };
	}
	var matches = jQuery.map(this, function(mico, i) { // XXX: use Array.filter to avoid dependency
		return check(mico[field], value) ? mico : null;
	});
	return new Collection(matches);
};
