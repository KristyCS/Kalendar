from flask import Blueprint,jsonify,request
from app.models import db, Rsvp
from app.forms import RsvpForm
from flask_login import login_required
from ..util import validation_errors_to_error_messages



rsvp_routes = Blueprint("rsvps",__name__)

@rsvp_routes.route('',methods=['POST'])
@login_required
def createRsvp():
    form = RsvpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        rsvp = Rsvp()
        form.populate_obj(rsvp)
        db.session.add(rsvp)
        db.session.commit()
        return rsvp.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@rsvp_routes.route('/<int:id>',methods=['PUT'])
@login_required
def editRsvp(id):
    # print("@@@@@@@@@@@@@@@@request!!!!!!!!!!",request.data)
    # print("@@@@@@@@@@@@@@@@request!!!!!!!!!!",request.data)
    form = RsvpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        rsvp = Rsvp.query.get(id)
        rsvp.status = form.data["status"]
        rsvp.comment = form.data["comment"]
        db.session.commit()
        return rsvp.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
