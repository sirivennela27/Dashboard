from flask import Blueprint, jsonify, request
from conndb import get_conn

app = Blueprint('soft_delete_app', __name__)
@app.route("/api/soft-delete-vehicle/<int:vehicle_id>", methods=['PATCH'])
def soft_delete_vehicle(vehicle_id):
    conn=get_conn()
    cursor=conn.cursor()
    cursor.execute("UPDATE vehicles set is_deleted=1 WHERE ID=?",(vehicle_id,))
    conn.commit()
    conn.close()
    return jsonify({"message":"vehicle soft deleted successfully","vehicle_id":vehicle_id}),200