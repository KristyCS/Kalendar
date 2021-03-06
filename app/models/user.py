from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_photo = db.Column(db.String(),default="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png", nullable=False)
    about = db.Column(db.String(), nullable=True)

    events = db.relationship( "Event", back_populates = "host",  cascade="all, delete, delete-orphan")
    rsvps = db.relationship( "Rsvp", back_populates = "user",  cascade="all, delete, delete-orphan")
    photos = db.relationship( "Photo", back_populates = "user", cascade ="all, delete, delete-orphan")
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_simple_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
        }

    
    def to_dict(self):
        return{
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_photo':self.profile_photo,
            'about': self.about,
            'events': [event.to_dict() for event in self.events],
            'rsvps': [rsvp.to_dict() for rsvp in self.rsvps], 
        }