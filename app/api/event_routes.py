from flask import Blueprint,jsonify,request
from app.models import db, Event, event
from app.forms import EventForm
from flask_login import login_required
from ..util import validation_errors_to_error_messages
from datetime import datetime
from app.config import Config
import requests
import uuid
from ..aws_s3  import upload_file_to_s3 

event_routes = Blueprint("events",__name__)


@event_routes.route('')
@login_required
def allEvents():
    allEvents=Event.query.all()
    return {event.id:event.to_dict() for event in allEvents}

@event_routes.route('/<int:id>',methods=['PUT'])
@login_required
def editEvent(id):
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
        event = Event.query.get(id)
        form.populate_obj(event)
        event.lat = data["results"][0]["geometry"]["lat"]
        event.lng = data["results"][0]["geometry"]["lng"]
        db.session.commit()
        return event.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@event_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def deleteEvent(id):
    event = Event.query.get(id)
    db.session.delete(event)
    db.session.commit()
    return {"id":id}


@event_routes.route('',methods=['POST'])
@login_required
def createEvent():
    form = EventForm()
    photo_url = ""
    if request.files.getlist('posterFile'):
        posterFile = request.files.getlist('posterFile')[0]
        posterFile.filename = uuid.uuid4().hex + '.'+ posterFile.filename.split('.')[1]
        photo_url = upload_file_to_s3(posterFile, 'kalendar-aa')
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
        event.poster = photo_url
        event.lat = data["results"][0]["geometry"]["lat"]
        event.lng = data["results"][0]["geometry"]["lng"]
        db.session.add(event)
        db.session.commit()
        return event.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

