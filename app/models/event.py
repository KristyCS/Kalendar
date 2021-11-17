from .db import db
from datetime import datetime

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    host_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    theme = db.Column(db.String(1000), nullable=False)
    description = db.Column(db.String(), nullable=True)
    poster = db.Column(db.String(), nullable=True)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable = False)
    lat = db.Column(db.Numeric(scale=7),nullable=False)
    lng = db.Column(db.Numeric(scale=7),nullable=False)
    start_at = db.Column(db.DateTime, nullable=False)
    end_at = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,onupdate=datetime.now())
    
    
    host = db.relationship( "User", back_populates = "events")
    rsvps = db.relationship("Rsvp", back_populates="event", cascade = 'all, delete , delete-orphan')
    photos = db.relationship("Photo", back_populates="event", cascade = 'all, delete, delete-orphan')
  
    def to_dict(self):
        return {
            'id': self.id,
            'host': self.host.to_simple_dict(),
            'description': self.description,
            'theme': self.theme,
            'poster': self.poster,
            'city': self.city,
            'state': self.state,
            'lat': float(self.lat),
            'lng':float(self.lng),
            'start_at': self.start_at,
            'end_at': self.end_at,
            "photos": [photo.to_simple_dict() for photo in self.photos],
            "rsvps": [rsvp.to_dict() for rsvp in self.rsvps],  
        }

    def to_simple_dict(self):
        return {
            'id': self.id,
            'host': self.host.to_simple_dict(),
        }

    def update(self, description=None):
        self.description = description if description else self.description
        return self