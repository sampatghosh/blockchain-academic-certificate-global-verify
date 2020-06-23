import sqlite3

conn = sqlite3.connect("../db/projectdb.db")

#Creating a cursor object using the cursor() method
cursor = conn.cursor()

#Doping EMPLOYEE table if already exists
cursor.execute("DROP TABLE STUDENT_DETAILS")
print("STUDENT_DETAILS Table dropped")

cursor.execute("DROP TABLE STUDENT_DOCUMENT_HASH")
print("STUDENT_DETAILS Table dropped")

#Commit your changes in the database
conn.commit()

#Closing the connection
conn.close()
