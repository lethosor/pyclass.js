window.Class = (function(){
	"use strict";
	
	var BaseClass = function(){
		var self = {};
		self.__init__ = function(){};
		return self;
	};
	
	var Class = function(){
		var classes = [].slice.apply(arguments),
			constructor = classes.pop(),
			object = {},
			mro = [];
		return function(){
			constructor(object);
			if ('__init__' in object && 'apply' in object.__init__)
				object.__init__.apply(this, arguments);
			return object;
		};
	};
	
	Class.BaseClass = BaseClass;
	
	return Class;
})();
