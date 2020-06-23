"""
This is a dummy data insert script. Only used for testing purpose. 
NOT TO BE USED in application. 
"""
import sqlite3
from sqlite3 import Error
import datetime



def create_connection(db_file):
	conn = None
	try:
		conn = sqlite3.connect(db_file)
	except Error as e:
		print(e)

	return conn


def insert_student(conn, student):
	sql = '''INSERT INTO STUDENT_DETAILS(email_id,name,password,dob)
			 VALUES(?,?,?,?)'''
	cur = conn.cursor()
	cur.execute(sql, student)
	return cur.lastrowid


def insert_doc_hash(conn, doc):
	sql = '''INSERT INTO STUDENT_DOCUMENT_HASH(student_id,document_hash,date_created)
			 VALUES(?,?,?)'''
	cur = conn.cursor()
	cur.execute(sql, doc)
	return cur.lastrowid


def main():
	database_file = "../db/projectdb.db"
	conn = create_connection(database_file)

	student = ('sampatghosh1995@gmail.com', 'Sampat Kr Ghosh', '12345@proj', '1995-02-15')
	student_id = insert_student(conn, student)
	print("student id: ", student_id)
	'''
	doc1 = (student_id, '0xab4f61c361e5ef91582e70634dfbf2214fbdb6f29c949160b69f27ae947d919d', datetime.datetime.now())
	doc_id = insert_doc_hash(conn, doc1)
	print("student id: ", student_id)
	print("doc id: ", doc_id)

	doc2 = (student_id, '0x5afc41c311e5ef91582e70634dfbf2214fbdb6f29c949160b69f27ae947d919d', datetime.datetime.now())
	doc_id = insert_doc_hash(conn, doc2)
	print("student id: ", student_id)
	print("doc id: ", doc_id)
	'''
	conn.commit()
	conn.close()


if __name__ == '__main__':
	main()

