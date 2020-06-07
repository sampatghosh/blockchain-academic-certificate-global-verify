module.exports = {
	rpc: {
		host:"localhost",
		port:8545,
		gas: 20000000
	},
	networks: {
		development: {
			host: "localhost", //our network is running on localhost
			port: 8545, // port where your blockchain is running
			network_id: "*",
			from: "0x7c5c723cd38eeb2d2975dc241fa0a54a9f0ff3da", // use the account-id generated during the setup process
			gas: 20000000

		}
	}
};
