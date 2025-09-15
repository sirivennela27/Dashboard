import sqlite3
import os

conn = sqlite3.connect('database.db')
cursor = conn.cursor()


cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL          
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS vehicles (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Country TEXT,
        Brand TEXT,
        Model TEXT,
        Manufacturing_Year INTEGER,
        Business_segment TEXT,
        Startdate TEXT
    )
''')
cursor.execute('''
               CREATE TABLE IF NOT EXISTS reset_token(
               ID INTEGER PRIMARY KEY AUTOINCREMENT,
               email TEXT NOT NULL,
               token TEXT NOT NULL,
               expiry TEXT NOT NULL 
               )''')

cursor.execute('''
               CREATE TABLE IF NOT EXISTS vehicle_base_info (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER,
    Year INTEGER,        
    Quarter TEXT,
    Subsidiary TEXT,
    Currency TEXT,
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(ID)
)''')

cursor.execute('''CREATE TABLE IF NOT EXISTS vehicle_assignment_info (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER,
    Employee_ID TEXT,
    Ownership TEXT,
    Lease_Company TEXT,
    Contract_Length TEXT,
    Contractual_Mileage TEXT,
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(ID)
)
''')
cursor.execute('''CREATE TABLE IF NOT EXISTS vehicle_cost_info (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER,
    Depreciation_Cost TEXT,
    Accidents TEXT,
    Rentals TEXT,
    Maintenance TEXT,
    Insurance TEXT,
    Fuel_Cost TEXT,
    Total_Cost TEXT,
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(ID)
)
''')

cursor.execute(''' CREATE TABLE IF NOT EXISTS vehicle_license_info(
               ID INTEGER PRIMARY KEY AUTOINCREMENT,
               vehicle_id INTEGER,
               Fuel_Type TEXT,
               Classification TEXT,
               Status TEXT,
               VIN TEXT UNIQUE,
               License_Plate TEXT UNIQUE,
               Expiration_Date INTEGER,
               Last_Mileage INTEGER,
               Last_Mileage_Date INTEGER,
               CO2_Emissions INTEGER,
               Avg_Fuel_Consumption INTEGER,
               Actual_Fuel_Consumption INTEGER,
               Electricity_Consumption INTEGER,
              FOREIGN KEY(vehicle_id) REFERENCES vehicles(ID))''')

conn.commit()
conn.close()

print("Users table created (no data inserted).")
print("Vehicles table created and 8 sample records inserted.")
