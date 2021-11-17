from flask import Blueprint,jsonify,request
from app.models import db, Event
from app.forms import EventForm
from flask_login import login_required
from ..util import validation_errors_to_error_messages
from datetime import datetime
from app.config import Config
import requests

event_routes = Blueprint("events",__name__)


@event_routes.route('',methods=['POST'])
@login_required
def createEvent():
    form = EventForm()
    city = form.data["city"]
    state = form.data["state"]
    response = requests.get(
            "https://api.opencagedata.com/geocode/v1/json?" +
            f"key={Config.OPEN_CAGE_API_KEY}" +
            f"&q={city},{state},USA")
    data = response.json()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event()
        form.populate_obj(event)
        event.lat = data["results"][0]["geometry"]["lat"]
        event.lng = data["results"][0]["geometry"]["lng"]
        db.session.add(event)
        db.session.commit()
        return event.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

