from flask import Blueprint, jsonify
from app.config import Config

map_routes = Blueprint('map', __name__)

@map_routes.route('/key', methods=['GET'])
def getGoogleMapsApiKey():
    return {"key" : Config.GOOGLE_MAP_KEY }