from app.models import db, Event
from faker import Faker


# Adds a demo user, you can add other users here if you want
def seed_events():
    fake = Faker()
    event1 = Event(
        host_id=1, theme='cooking', description=fake.text(800), \
            poster="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y29va2luZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", \
            city='Boston',state="MA", \
            lat="", lng="", \
            start_at="",end_at="" )
    event2 = Event(
        host_id=1, theme='cooking', description=fake.text(600), \
            poster="https://images.unsplash.com/photo-1540420828642-fca2c5c18abe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNvb2tpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", \
            city='New York',state="NY", \
            lat="", lng="", \
            start_at="",end_at="" )
    event3 = Event(
        host_id=1, theme='sports', description=fake.text(700), \
            poster="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3BvcnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", \
            city='Boston',state="MA", \
            lat="", lng="", \
            start_at="",end_at="" )
    event4 = Event(
        host_id=2, theme='APP Academy', description=fake.text(200), \
            poster="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", \
            city='Boston',state="MA", \
            lat="", lng="", \
            start_at="",end_at="" )
    event5 = Event(
        host_id=2, theme='cooking', description=fake.text(400), \
            poster="https://media.istockphoto.com/photos/reusable-bag-full-of-colourful-and-fresh-organic-vegetables-and-on-picture-id1272443198?b=1&k=20&m=1272443198&s=170667a&w=0&h=mIGGm1JtUeTShSLCDSd1iK5KrAatbM0NSklUe49pAec=", \
            city='New York',state="NY", \
            lat="", lng="", \
            start_at="",end_at="" )
    
    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)
    db.session.add(event4)
    db.session.add(event5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()