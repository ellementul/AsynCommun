module.exports = function CrHoarder(){
	var hoarder = [];
	
	var push = function(val){
		hoarder.push(val);
	};
	
	push.take = function(func){
		setTimeout(function(){
			while(hoarder.length)
				func(hoarder.shift());
		}, 0);
	}
	
	return push;
}