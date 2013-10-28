window.Class = (function(){
	"use strict";
	var Class = function(){
		var classes = [].slice.apply(arguments),
			constructor = classes.pop();
	}
	
	return Class;
});
