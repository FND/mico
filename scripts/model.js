/*
 * content item
 */

var Tiddler = function(title) {
	this.id = generateID();
	this.title = title;
};

/*
 * tiddler collection
 */

var Store = function(tiddlers) {
	tiddlers = tiddlers || [];
	this.index = {};
	this.linkmap = {}; // XXX: rename?
	for(var i = 0; i < tiddlers.length; i++) {
		this.add(tiddlers[i]);
	}
	this.length = tiddlers.length; // pseudo-array
};

Store.prototype = new Array();

Store.prototype.add = function(tiddler) {
	this.push(tiddler);
	this.index[tiddler.id] = this.length - 1;
	if(this.linkmap[tiddler.title] === undefined) {
		this.linkmap[tiddler.title] = [];
	}
	this.linkmap[tiddler.title].push(tiddler.id);
};

Store.prototype.remove = function(id) {
	var i = this.index[id];
	if(i === undefined) {
		return false;
	}
	var title = this[i].title;
	delete this.index[id];
	delete this.linkmap[title];
	var tiddler = this.splice(i, 1)[0];
	for(var key in this.index) { // update index references -- XXX: inefficient!?
		if(this.index[key] > i) {
			this.index[key]--;
		}
	}
	return tiddler;
};

// XXX: experimental
Store.prototype.filter = function(field, value, invert) {
	if(invert) {
		var check = function(a, b) { return a !== b; };
	} else {
		check = function(a, b) { return a === b; };
	}
	var matches = jQuery.map(this, function(tiddler, i) { // XXX: use Array.filter to avoid dependency
		return check(tiddler[field], value) ? tiddler : null;
	});
	return new Store(matches);
};
