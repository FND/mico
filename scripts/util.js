(function() {

var ns = mico;

ns.util = {
	generateID: function() {
		return new Date() * Math.random(); // TODO: proper UUID
	}
};

})();
