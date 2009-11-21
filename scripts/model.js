/*
 * content items
 */

var Tiddler = function(title) {
	this.id = new Date() * new Date(); // TODO: proper UUID
	this.title = title;
};

/*
 * tiddler collection
 */

var Store = function(tiddlers) {
	tiddlers = tiddlers || [];
	for(i = 0; i < tiddlers.length; i++) {
		this[i] = tiddlers[i];
	}
	this.length = tiddlers.length;
};

Store.prototype.push = Array.prototype.push;
Store.prototype.splice = Array.prototype.splice; // makes Firebug treat object as array

Store.prototype.add = function(tiddler) {
	this.push(tiddler);
};
