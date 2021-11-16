from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Event

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/events')
def getAllEventsByUserId(id):
    events = Event.query.filter(Event.host_id==id).all()
    return {event.id: event.theme for event in events}