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
    form = RsvpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        rsvp = Rsvp.query.get(id)
        rsvp.status = form.data["status"]
        rsvp.comment = form.data["comment"]
        db.session.commit()
        return rsvp.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@rsvp_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def deleteRsvp(id):
    rsvp = Rsvp.query.get(id)
    db.session.delete(rsvp)
    db.session.commit()
    return {"id":id}

@rsvp_routes.route('/user/<int:id>')
@login_required
def findRsvpByUserId(id):
    rsvp = Rsvp.query.filter(Rsvp.user_id==id).first()
    return rsvp.to_dict()

@rsvp_routes.route('/event/<int:id>')
@login_required
def getAllRsvpsByEventId(id):
    rsvps = Rsvp.query.filter(Rsvp.event_id==id).all()
    return {rsvp.id:rsvp.to_dict() for rsvp in rsvps}


@rsvp_routes.route('/event/<int:eventId>/user/<int:userId>')
@login_required
def getAllRsvpsByEventAndUser(eventId,userId):
    rsvp = Rsvp.query.filter(Rsvp.event_id==eventId , Rsvp.user_id==userId).first()
    if rsvp:
      return rsvp.to_dict()
    return {}