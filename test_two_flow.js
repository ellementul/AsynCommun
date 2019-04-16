const CrInter = require("./TwoFlow.js");

function first_transform_func(val){
	if(val.test != "Beg")
		throw new Error();
	return {test: "First"}
}

function second_transform_func(val){
	if(val.test != "End")
		throw new Error();
	return {test: "Second"}
}

var testedInter = new CrInter(first_transform_func, second_transform_func);


function BegModule(Inter){
	const Send = Inter.connect(Receive);

	Send({test: "Beg"});

	function Receive(val){
		if(val.test != "Second")
			throw new Error();
		console.log("TwoFlow: Success!");
	}
}

function EndModule(Inter){
	const Send = Inter.connect(Receive);

	function Receive(val){
		if(val.test != "First")
			throw new Error();
		Send({test: "End"});
	}
}

BegModule(testedInter);
EndModule(testedInter);




