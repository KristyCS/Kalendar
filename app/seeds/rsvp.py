from app.models import db, Rsvp
from faker import Faker

def seed_Rsvp():
    fake = Faker()
    rsvp1 = Rsvp(
        user_id = 5, event_id = 2, status="yes", comment= fake.text(100), 
     )
    rsvp2 = Rsvp(
        user_id = 1, event_id = 3, status="no rsp", comment= fake.text(100), 
    )
    rsvp3 = Rsvp(
        user_id = 5, event_id = 1, status="yes", comment= fake.text(100), 
    )
    rsvp4 = Rsvp(
        user_id = 5, event_id = 2, status="maybe", comment= fake.text(100), 
     )
    rsvp5 = Rsvp(
        user_id = 2, event_id = 1, status="no", comment= fake.text(100), 
     )
    rsvp6 = Rsvp(
        user_id = 1, event_id = 2, status="yes", comment= fake.text(100), 
     )
    rsvp7 = Rsvp(
        user_id = 5, event_id = 3, status="no", comment= fake.text(100), 
     )
    rsvp8 = Rsvp(
        user_id = 5, event_id = 4, status="yes", comment= fake.text(100), 
     )
    rsvp9 = Rsvp(
        user_id = 5, event_id = 5, status="maybe", comment= fake.text(100), 
     ) 
    rsvp10 = Rsvp(
        user_id = 4, event_id = 2, status="yes", comment= fake.text(100), 
     )
    rsvp11 = Rsvp(
        user_id = 4, event_id = 3, status="maybe", comment= fake.text(100), 
     ) 
    rsvp12 = Rsvp(
        user_id = 4, event_id = 4, status="yes", comment= fake.text(100), 
     )
    
    db.session.add(rsvp1)
    db.session.add(rsvp2)
    db.session.add(rsvp3)
    db.session.add(rsvp4)
    db.session.add(rsvp5)
    db.session.add(rsvp6)
    db.session.add(rsvp7)
    db.session.add(rsvp8)
    db.session.add(rsvp9)
    db.session.add(rsvp10)
    db.session.add(rsvp11)
    db.session.add(rsvp12)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_rsvps():
    db.session.execute('TRUNCATE rsvps RESTART IDENTITY CASCADE;')
    db.session.commit()