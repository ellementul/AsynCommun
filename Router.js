function CrRoutingInters(log){
	let adr_arr = [];

	
	let connect = function(Inter, adress){

		adr_arr[adress] = Inter.connect(Input);
		setTimeOut(() => adr_arr[adress]({action: "Connected", adress: adress}), 0);
	};


	connect.log = log;
	function Input(mess){
		if(typeof(connect.log) == "function") 
			connect.log(mess);

		let adr = mess.adr;
		delete mess.adr;

		if(connect.is_freeze) 
			Object.freeze(mess);

		if(adr_arr[adr]) 
			adr_arr[adr](mess); 
		else 
			throw new Error("Func on adress(" + adr +  ") is not find!");
	}

	return connect;
}

module.exports = CrRoutingInters;
