(function() {

var ns = micopad;

ns.util = {
	generateID: function() {
		return new Date() * Math.random(); // TODO: proper UUID
	}
};

})();
