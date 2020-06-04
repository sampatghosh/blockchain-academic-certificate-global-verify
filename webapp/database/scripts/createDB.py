import sqlite3
from sqlite3 import Error


def create_connection(db_file):
	conn = None;
	try:
		conn = sqlite3.connect(db_file)
		print(sqlite3.version)
	except Error as e:
		print(e)
	finally:
		if conn:
			conn.close()


if __name__ == '__main__':
	create_connection(r"E:\MTech\2nd_sem\BCT\Project\blockchain-academic-certificate-global-verify\webapp\database\db\projectdb.db")
	