const CrInter = require("./TwoFlow.js");
const CrRouter = require("./Router.js");

function DefaultModule(Inter){
	var Send = Inter.connect(Receive);

	Send({test: "Def", adr: 0});

	var is_con = false;
	function Receive(mess){
		if(mess.action != "Connect" && !is_con)
			throw new Error();

		if(mess.action == "Connect"){
			is_con = true;
			return;
		}

		if(mess.adr)
			throw new Error();

		if(mess.test != "Two")
			throw new Error();

		console.log("Router: Success!");
	}
}

function ZeroModule(Inter){
	var Send = Inter.connect(Receive);

	var is_con = false;
	function Receive(mess){
		if(mess.action != "Connect" && !is_con)
			throw new Error();

		if(mess.action == "Connect"){
			is_con = true;
			return;
		}


		if(mess.test != "Def")
			throw new Error();
		Send({test: "Zero", adr: 1});
	}
}

function OneModule(Inter){
	var Send = Inter.connect(Receive);

	var is_con = false;
	function Receive(mess){
		if(mess.action != "Connect" && !is_con)
			throw new Error();

		if(mess.action == "Connect"){
			is_con = true;
			return;
		}


		if(mess.test != "Zero")
			throw new Error();
		Send({test: "One", adr: "Two"});
	}
}

function TwoModule(Inter){
	var Send = Inter.connect(Receive);

	var is_con = false;
	function Receive(mess){
		if(mess.action != "Connect" && !is_con)
			throw new Error();

		if(mess.action == "Connect"){
			is_con = true;
			return;
		}


		if(mess.test != "One")
			throw new Error();
		Send({test: "Two"});
	}
}

var Router = new CrRouter();

var Inter = new CrInter();
var ZeroInter = new CrInter();
var OneInter = new CrInter();
var TwoInter = new CrInter();



DefaultModule(Inter);
ZeroModule(ZeroInter);
OneModule( OneInter);
TwoModule(TwoInter);

Router(Inter);
Router(ZeroInter, 0);
Router(OneInter, 1);
Router(TwoInter, "Two");

