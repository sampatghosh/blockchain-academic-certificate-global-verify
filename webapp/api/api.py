import flask
from flask import jsonify, request

app = flask.Flask(__name__)
app.config["DEBUG"] = True

# dummy api data
hashdata = [
	{
		'user_id': 'mondalkushal02@gmail,com',
		'hash' : ['0x5abf61c361e5ef91582e70634dfbf2214fbdb6f29c949160b69f27ae947d919d','0x5abf61c311e5ef91582e70634dfbf2214fbdb6f29c949160b69f27ae947d919d']
	},
	{
		'user_id': 'samrk95@gmail,com',
		'hash' : ['0xab4f61c361e5ef91582e70634dfbf2214fbdb6f29c949160b69f27ae947d919d','0x5afc41c311e5ef91582e70634dfbf2214fbdb6f29c949160b69f27ae947d919d']
	}
]

# api root page
@app.route('/', methods=['GET'])
def home():
	return "<h4>API home</h4><p>This api provides data for user id and hash</p>"


#api call for all hash data. To be removed. 
@app.route('/api/v1/queries/hashvalues/all', methods=['GET'])
def api_call_hash_all():
	return jsonify(hashdata)


# api call for hash values with parameter in request. Expected parameter 'id'
@app.route('/api/v1/queries/hashvalue', methods=['GET'])
def api_call_hash_id():
	param_user_id = "";
	
	if 'id' in request.args:
		param_user_id = request.args['id']
	else:
		return "<h3>Error: No user identification provided. Check if id is specified.</h3>"

	result = []
	for data in hashdata:
		if data['user_id'] == param_user_id:
			result.append(data)

	return jsonify(result)














app.run()