import sqlite3

def get_conn():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row  
    return conn
