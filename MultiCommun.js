module.exports = function CrInterfice(comm){
	let pull = [];

	let staticInput = comm.connect(dynamicInput);
	
	this.connect = function(outputFunc){
		
		pull.push(outputFunc);

		return staticInput;
	};
	
	function dynamicInput(value){
		pull.forEach(func => func(value));
	}
}


