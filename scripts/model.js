/*
 * content items
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
	for(i = 0; i < tiddlers.length; i++) {
		var tiddler = tiddlers[i];
		this.add(tiddler);
	}
	this.length = tiddlers.length;
};

Store.prototype.push = Array.prototype.push;
Store.prototype.splice = Array.prototype.splice; // makes Firebug treat object as array

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
