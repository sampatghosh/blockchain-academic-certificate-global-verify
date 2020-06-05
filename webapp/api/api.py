import flask
from flask import jsonify, request
from flask_cors import CORS
import sqlite3 as sqlite
import datetime



app = flask.Flask(__name__)
CORS(app)
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



# api home page

@app.route('/', methods=['GET'])
def home():
	return "<h4>API home</h4><p>This api provides data for user id and hash</p>"


#api call for all hash data. To be removed. 

@app.route('/api/v1/queries/hashvalues/all', methods=['GET'])
def api_call_hash_all():
	return jsonify(hashdata)


# api call for inserting hash value in STUDENT_DOCUMENT_HASH table
# client will pass student id and hash of document and api will return status of insertion.
@app.route('/api/v1/insert/hashvalue', methods=['GET'])
def api_call_insert_hash():
	param_student_id = 0
	hash_value = ""

	ResultData = {
		'status': 1
	}

	if 'id' in request.args and 'hash' in request.args:
		param_student_id = request.args['id']
		hash_value = request.args['hash']
		print("parameters recieved")
		database_file = r"..\database\db\projectdb.db"
		conn = create_connection(database_file)
		print("database connection created")
		print(conn)
		doc = (param_student_id, hash_value, datetime.datetime.now())
		doc_id = insert_doc_hash(conn, doc)
		conn.commit();
		conn.close();
		print("database connection closed.")
		print("student_id: ", param_student_id)
		print("doc_id: ", doc_id)
		ResultData['status'] = 0

	else:
		print("Insufficient parameters")
	
	return jsonify(ResultData)





# api call for hash values with parameter in request. Expected parameter 'id'
# client will pass student id and api will return all hashvalues associated with that id(if exists)

@app.route('/api/v1/queries/hashvalue', methods=['GET'])
def api_call_hash_id():
	param_student_id = 0


    # a blank response format for the api client

	ResultData = {
		'student_id': None,
		'total_hash': 0,
		'hash_values': [],
		'id_exists': False
	}
	
	
	# check if GET request has id parameter. If not found return blank response

	if 'id' in request.args:
		param_student_id = request.args['id']
		ResultData['student_id'] = param_student_id
		print("id found in query")
	else:
		return jsonify(ResultData)


	# establish database connection

	database_file = r"..\database\db\projectdb.db"
	conn = create_connection(database_file)
	print("connection created")
	print(conn)


	# checking if param_user_id exists in STUDENT_DETAILS table 

	if conn is not None:
		exists = 0
		exists = check_for_id(conn, param_student_id)
		if exists is not None:
			ResultData['id_exists'] = True
			print("id exists")
			hash_arr = get_hash_values(conn, param_student_id)
			if len(hash_arr) == 0:
				ResultData['total_hash'] = 0
				# return jsonify(ResultData)
			else:
				ResultData['total_hash'] = len(hash_arr)
				for element in hash_arr:
					ResultData['hash_values'].append(element)
				# return jsonify(ResultData)
		else:
			print("id does not exists")



	#closing connection to database and returning result

	conn.close()
	print("connection closed. Returning result.")
	return jsonify(ResultData)



# utility function - create connection to database and return connection object

def create_connection(db_file):
	conn = None;

	try:
		conn = sqlite.connect(db_file)
	except Exception as e:
		print(e)

	return conn



# utility function - checking if student_id exists in STUDENT_DETAILS table

def check_for_id(conn, student_id):
	sql = "SELECT 1 FROM STUDENT_DETAILS WHERE ID = ? LIMIT 1"
	rows = 0
	try:
		# conn.row_factory = sqlite.Row
		cur = conn.cursor()
		temp = cur.execute(sql, (student_id))
		rows = cur.fetchone()
		print("rows: ",rows)
	except Exception as e:
		print(e)
	
	return rows



# utility function -  Returns a list of hashvalues present in STUDENT_DOCUMENT_HASH table associated with
# the parameter id

def get_hash_values(conn, id):
	doc_hash = []
	sql = "SELECT document_hash FROM STUDENT_DOCUMENT_HASH WHERE student_id = ?"
	row = 0

	try:
		cur = conn.cursor()
		cur.execute(sql, (id))
		rows = cur.fetchall()
		for row in rows:
			doc_hash.append(row[0])
		print(doc_hash)
	except Exception as e:
		print(e)

	return doc_hash
	
	
# utility function - insert tuple in STUDENT_DOCUMENT_HASH table with given parameters in doc
def insert_doc_hash(conn, doc):
	sql = '''INSERT INTO STUDENT_DOCUMENT_HASH(student_id,document_hash,date_created)
			 VALUES(?,?,?)'''
	cur = conn.cursor()
	cur.execute(sql, doc)
	return cur.lastrowid



app.run(host="127.0.0.2")