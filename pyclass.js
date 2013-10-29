window.Class = (function(){
	"use strict";
	
	var BaseClass = function(){
		var self = {};
		self.__init__ = function(){};
		return self;
	};
	
	var MRO = function(){
		var classes = [].slice.apply(arguments),
			seqs = [],
			res = [];
		for (var i = 0; i < classes.length; i++) {
			seqs.push(classes[i].isClass?classes[i].__mro__.slice():[]);
		}
		seqs.push(classes);
		while (1) {
			var non_empty = seqs.filter(function(x){return x&&[].slice.apply(x).length});
			if (!non_empty.length)
				return res;
			for (var i = 0; i < non_empty.length; i++) {
				var seq = non_empty[i],
					candidate = seq[0],
					not_head = false;
				// Check to see if the candidate is later in another sequence
				for (var j = 0; j < non_empty.length; j++) {
					if (non_empty[j].slice(1).indexOf(candidate) > -1) {
						not_head = true;
						break;
					}
				}
				if (not_head)  // Invalid candidate
					candidate = null;
				else
					break;
			}
			if (!candidate) {
				throw TypeError('Inconsistent MRO');
			}
			res.push(candidate);
			// Remove candidate from sequences
			for (var i = 0; i < non_empty.length; i++) {
				if (non_empty[i][0] == candidate) {
					non_empty[i].shift();
				}
			}
		}
	};
	
	var Class = function(){
		var classes = [].slice.apply(arguments),
			constructor = classes.pop(),
			mro = [];
		var init = function(){
			var object = {},
				classList = init.__mro__.slice();
			// Add a helper function to call this class's constructor
			classList.push(function(){
				constructor(object);
			});
			for (var i = 0; i < classList.length; i++) {
				var instance = classList[i].apply(this, arguments);
				for (var k in instance) {
					if (!(k in {})) {
						object[k] = instance[k];
					}
				}
			}
			if ('__init__' in object && 'apply' in object.__init__)
				object.__init__.apply(this, arguments);
			return object;
		};
		init.__mro__ = MRO.apply(this, classes);
		init.isClass = true;
		return init;
	};
	
	Class.BaseClass = BaseClass;
	Class.MRO = MRO;
	
	return Class;
})();
