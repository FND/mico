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
