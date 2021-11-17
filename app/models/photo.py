from .db import db

from datetime import datetime

class Photo(db.Model):
    __tablename__= 'photos'

    id= db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"),nullable = False)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"), nullable = False)
    img_url = db.Column(db.String(), nullable = True)
    comment = db.Column(db.String(), nullable = True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,onupdate=datetime.now())

    user = db.relationship("User", back_populates = "photos")
    event = db.relationship("Event", back_populates = "photos")

    def to_dict(self):
        return {
            'img_url' :self.img_url,
            'comment': self.comment,
        }
