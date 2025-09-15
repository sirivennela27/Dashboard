from flask import Blueprint, jsonify,request
from dateutil import parser
from conndb import get_conn


def extract_date_only(date_str):
    try:
        parsed = parser.parse(date_str)
        return parsed.strftime('%Y-%m-%d')
    except Exception as e:
        print(f"Date parsing error: {e}")
        return None


app = Blueprint('vehicle_app', __name__)

@app.get("/api/vehicles")
def get_vehicles():
    conn = get_conn()
    rows = conn.execute("SELECT * FROM vehicles where is_deleted=0").fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@app.route("/api/add-vehicle", methods=['POST'])
def add_vehicles():
    data = request.get_json()
    print("Received data:", data)

   
    start_date = extract_date_only(data.get('Startdate'))
    expiration_date = extract_date_only(data.get('Expiration_Date'))
    last_mileage_date = extract_date_only(data.get('Last_Mileage_Date'))

    conn = get_conn()
    cursor = conn.cursor()

    try:
       
        cursor.execute("""
            SELECT vehicle_id FROM vehicle_license_info
            WHERE VIN = ? AND License_Plate = ?
        """, (data['VIN'], data['License_Plate']))
        existing_vehicle = cursor.fetchone()

        if existing_vehicle:
            return jsonify({"message": "Vehicle with this VIN and License Plate already exists"}), 409

        cursor.execute('''
            INSERT INTO vehicles (Country, Brand, Model, Manufacturing_Year, Business_segment, Startdate)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            data['Country'],
            data['Brand'],
            data['Model'],
            data['Manufacturing_Year'],
            data['Business_segment'],
            start_date  
        ))

        vehicle_id = cursor.lastrowid

        cursor.execute('''
            INSERT INTO vehicle_base_info (vehicle_id, Quarter, Subsidiary, Currency)
            VALUES (?, ?, ?, ?)
        ''', (
            vehicle_id,
            data['Quarter'],
            data['Subsidiary'],
            data['Currency']
        ))

        # vehicle_assignment_info
        cursor.execute('''
            INSERT INTO vehicle_assignment_info (vehicle_id, Employee_ID, Ownership, Lease_Company, Contract_Length, Contractual_Mileage)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            vehicle_id,
            data['Employee_ID'],
            data['Ownership'],
            data['Lease_Company'],
            data['Contract_Length'],
            data['Contractual_Mileage']
        ))

        # vehicle_cost_info
        cursor.execute('''
            INSERT INTO vehicle_cost_info (vehicle_id, Depreciation_Cost, Accidents, Rentals, Maintenance, Insurance, Fuel_Cost, Total_Cost)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            vehicle_id,
            data['Depreciation_Cost'],
            data['Accidents'],
            data['Rentals'],
            data['Maintenance'],
            data['Insurance'],
            data['Fuel_Cost'],
            data['Total_Cost']
        ))

        # vehicle_license_info
        cursor.execute('''
            INSERT INTO vehicle_license_info (
                vehicle_id,
                Fuel_Type,
                Classification,
                Status,
                VIN,
                License_Plate,
                Expiration_Date,
                Last_Mileage,
                Last_Mileage_Date,
                CO2_Emissions,
                Avg_Fuel_Consumption,
                Actual_Fuel_Consumption,
                Electricity_Consumption  
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            vehicle_id,
            data['Fuel_Type'],
            data['Classification'],
            data['Status'],
            data['VIN'],
            data['License_Plate'],
            expiration_date,       
            data['Last_Mileage'],
            last_mileage_date,     
            data['CO2_Emissions'],
            data['Avg_Fuel_Consumption'],
            data['Actual_Fuel_Consumption'],
            data['Electricity_Consumption']
        ))

        conn.commit()

        vehicle = {
            "ID": vehicle_id,
            "Country": data['Country'],
            "Brand": data['Brand'],
            "Model": data['Model'],
            "Manufacturing_Year": data['Manufacturing_Year'],
            "Business_segment": data['Business_segment'],
            "Startdate": start_date,
        }
        return jsonify({"message": "Vehicle added successfully", "vehicle": vehicle}), 201

    except Exception as e:
        conn.rollback()
        print(f"Error inserting vehicle data: {e}")
        return jsonify({'error': 'Failed to insert vehicle data'}), 500
    finally:
        conn.close()



    


