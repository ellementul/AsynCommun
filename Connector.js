const CrHoarder = require("./Hoarder.js");

module.exports = function CrConnector(comm, commTwo){
	let Hoar = CrHoarder();
	let input = msg => Hoar(msg);

	input = commTwo.connect( comm.connect(msg => input(msg)) );
	Hoar.take(input);
}