"""
This script create the database for the application and only to be run once. 
"""

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
	create_connection(r"..\db\projectdb.db")
	