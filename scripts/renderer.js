(function() {

var ns = mico;

ns.Projection = function(collection, container) {
	$('<ul class="projection">').
		append($.map(collection, function(item, i) {
			return $("<li />").
				attach("<dl />").
					attach("<dt />").text(item.id).parent().
					attach("<dd />").text(item.title).parent().
					parent()[0];
		})).
		appendTo(container);
};

})();
