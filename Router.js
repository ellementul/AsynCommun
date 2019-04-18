function CrRoutingInters(is_log){
	var adr_arr = [];
	
	var connect = function(Inter, adress){
		if(!adress && adress !== 0) 
			adress = "Default";

		adr_arr[adress] = Inter.connect(Input);
		adr_arr[adress]({action: "Connect", adress: adress});
	};

	connect.is_log = false;

	function Input(mess){
		if(!mess.adr && mess.adr !== 0) 
			mess.adr = "Default";
		
		var adr = mess.adr;
		delete mess.adr;

		if(connect.is_log) 
			console.log(mess, adr);

		if(adr_arr[adr]) 
			adr_arr[adr](mess); 
		else 
			throw new Error("Func on adress(" + adr +  ") is not find!");
	}

	return connect;
}

module.exports = CrRoutingInters;
