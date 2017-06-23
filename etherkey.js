const hdkey = require('ethereumjs-wallet/hdkey');
const util = require('ethereumjs-util');
const Wallet = require('ethereumjs-wallet');

var characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Change this to the private key that you THOUGHT you typed when you made your Ether transaction
var basePrivateKey = '324j4jtg9jsdofh43324p2j2342653pghj345653jkdsf234325425';

// Change this to the public wallet address which contains your lost Ether
var targetPublicAddress = '0x33826Bbde9a2B9370BC7BA28BE4e1A6h23E5H4d3';

for(var keyPosition = 0; keyPosition < basePrivateKey.length; keyPosition++){

	for(var character = 0; character < characters.length; character++){

		try{
			var privateKeyGuess = setCharAt(basePrivateKey, keyPosition, characters[character]);
			var wallet = Wallet.fromPrivateKey(new Buffer(privateKeyGuess, "hex"));
			var publicAddress = util.bufferToHex(wallet.getAddress());
			if(publicAddress.toLowerCase() == targetPublicAddress.toLowerCase()){
				console.log('*** FOUND PRIVATE KEY: ' + privateKeyGuess);
				process.exit();
			}
		}catch(e){
			// Invalid character used in key
		}
		
	}
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}
