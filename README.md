pyclass.js
==========

Python-like classes in JavaScript

Example
-------
``` js
// Create some classes
var A = Class(function(self){self.a=2});
var B = Class(function(self){self.b=3});
var C = Class(A, B, function(self){self.c=4});

var x = C();
// -> Object {a: 2, b: 3, c: 4}
var x = new C();
// -> Object {a: 2, b: 3, c: 4}
```

