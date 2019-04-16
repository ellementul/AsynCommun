const CrHoarder = require("./Hoarder.js");

module.exports = function CrInterfice(first_transform_func, second_transform_func){
	
	var InputOne = null;
	var OutputOne = null;
	
	this.connect = function(outputFunc){
		if(OutputOne){
			if(second_transform_func){
				var begFunc = outputFunc;
				outputFunc = function(val){
					begFunc(first_transform_func(val));
				}
			}
			return TwoConnect(outputFunc);
		}
		else{
			if(first_transform_func){
				var begFunc = outputFunc;
				outputFunc = function(val){
					begFunc(second_transform_func(val));
				}
			}
			return OneConnect(outputFunc);
		}
	};
	
	function OneConnect(outputFunc){
		OutputOne = outputFunc;
		InputOne = CrHoarder();
		
		return function(val){
			InputOne(val);
		}
	}
	
	function TwoConnect(outputFunc){
		if(InputOne.take) setTimeout(InputOne.take.bind(null, outputFunc), 0);
		InputOne = outputFunc;
		
		return OutputOne;
	}
}


