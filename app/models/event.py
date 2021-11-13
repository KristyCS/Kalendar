from .db import db
import datetime

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
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    
    host = db.relationship( "User", back_populates = "events")
    rsvps = db.relationship("Rsvp", back_populates="event", cascade = 'all, delete , delete-orphan')
    # comments = db.relationship("Comment", back_populates="post", cascade = 'all, delete')
    # likes = db.relationship("Like", back_populates="post", cascade = 'all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_simple_dict(),
            'description': self.description,
            "photos": [photo.to_simple_dict() for photo in self.photos],
            "comments": [comment.to_simple_dict() for comment in self.comments],
            "likes": [like.to_simple_dict() for like in self.likes]
        }

    def to_simple_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'likes': len(self.likes)
        }

    def update(self, description=None):
        self.description = description if description else self.description
        return self
