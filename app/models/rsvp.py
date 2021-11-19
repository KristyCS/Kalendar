from .db import db
from datetime import datetime
class Rsvp(db.Model):
    __tablename__ = 'rsvps'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)
    status = db.Column(db.String(10), nullable = False)
    comment = db.Column(db.String(2200), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now,onupdate=datetime.now)


    user = db.relationship("User", back_populates="rsvps")
    event = db.relationship("Event", back_populates="rsvps")
   
    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_simple_dict(),
            'event': self.event.to_simple_dict(),
            'status': self.status,
            'comment': self.comment,
            'updated_at':self.updated_at,
        }

