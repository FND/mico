(function() {

var ns = mico;

ns.util = {
	generateID: function() {
		return new Date() * Math.random(); // TODO: proper UUID
	}
};

jQuery.fn.attach = function(html) {
	return jQuery(html).appendTo(this);
};

})();
