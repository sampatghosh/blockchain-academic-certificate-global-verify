import sqlite3
from sqlite3 import Error

def create_connection(db_file):
	conn = None
	try:
		conn = sqlite3.connect(db_file)
		return conn
	except Error as e:
		print(e)

	return conn


def create_table(conn, create_table_sql):
	try:
		cur = conn.cursor()
		cur.execute(create_table_sql)
	except Error as e:
		print(e)


def main():
	database_file = r"E:\MTech\2nd_sem\BCT\Project\blockchain-academic-certificate-global-verify\webapp\database\db\projectdb.db"

	sql_create_table_std_details = """ CREATE TABLE IF NOT EXISTS STUDENT_DETAILS(
											id text PRIMARY KEY,
											name text NOT NULL,
											password text NOT NULL,
											dob text
									);"""

	sql_create_table_std_cert_hash = """ CREATE TABLE IF NOT EXISTS STUDENT_DOCUMENT_HASH(
											student_id text NOT NULL,
											document_hash text PRIMARY KEY,
											date_created text,
											FOREIGN KEY (student_id) REFERENCES STUDENT_DETAILS(id)
									);"""

	conn = create_connection(database_file)

	if conn is not None:
		create_table(conn, sql_create_table_std_details)
		print("Table STUDENT_DETAILS is created.")
		create_table(conn, sql_create_table_std_cert_hash)
		print("Table STUDENT_DOCUMENT_HASH is created.")
	else:
		print("Error: Failed to connect to database.")


if __name__ == '__main__':
	main()