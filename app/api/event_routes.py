from flask import Blueprint,jsonify,request
from app.models import db, Event
from app.forms import EventForm
from flask_login import login_required
from ..util import validation_errors_to_error_messages

event_routes = Blueprint("events",__name__)


@event_routes.route('/',methods=['POST'])
@login_required
def createEvent():
    form = EventForm();
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event()
        form.populate_obj(event)
        db.session.add(event)
        db.session.commit()
        return event.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

