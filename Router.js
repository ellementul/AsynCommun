function CrRoutingInters(is_log, is_freeze){
	var adr_arr = [];
	
	var connect = function(Inter, adress){
		if(!adress && adress !== 0) 
			adress = "Default";

		adr_arr[adress] = Inter.connect(Input);
		adr_arr[adress]({action: "Connect", adress: adress});
	};

	connect.is_log = is_log;
	connect.is_freeze = is_freeze;

	function Input(mess){
		if(!mess.adr && mess.adr !== 0) 
			mess.adr = "Default";
		
		var adr = mess.adr;
		delete mess.adr;

		if(connect.is_log) 
			console.log(mess, "adress: " + adr);

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
