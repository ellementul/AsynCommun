const CrHoarder = require("./Hoarder.js");

var Hoar = new CrHoarder();
var arr = [1, 2, 3, 4, 5];
var test_arr = arr.concat();

while(arr.length)
	Hoar(arr.pop());

Hoar.take(val =>
	arr.unshift(val)
);

setTimeout(function(){
	if(arr.length != test_arr.length)
		throw new Error();

	while(arr.length)
		if(arr.pop() != test_arr.pop())
			throw new Error();

	console.log("Hoarder: Success!");
}, 100);

