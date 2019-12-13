const CrInter = require("./Commun.js");
const CrMultiComm = require("./MultiCommun.js");

const pullSize = 10;

let testedInter = new CrInter(staticInputFlow, staticOutputFlow);
StaticModule(testedInter);

let comm = new CrMultiComm(testedInter);

let size = pullSize;

while(size--)
	PullModule(comm);


let resCount = 0;

function staticInputFlow(val){
	if(val.test != "Count")
		throw new Error(val.test);

	resCount++;

	if(resCount == pullSize)
		return {test: "End"}
	else 
		return {test: "Count"}
}

function staticOutputFlow(val){
	if(val.test != "Beg")
		throw new Error(val.test);
	return {test: "First"}
}

let resCountEnd = 0;
function StaticModule(Inter){
	const Send = Inter.connect(Receive);

	Send({test: "Beg"});


	function Receive(val){
		if(val.test == "Count")
			resCountEnd++;
		else {
			if(val.test != "End" || resCountEnd != (pullSize - 1))
				throw new Error(val.test);
			else
				console.log("MultiComm: Success!");
		}
	}
}

function PullModule(Inter){
	const Send = Inter.connect(Receive);

	function Receive(val){
		if(val.test != "First")
			throw new Error();
		Send({test: "Count"});
	}
}




