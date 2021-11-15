from app.models import db, User
from faker import Faker


# Adds a demo user, you can add other users here if you want
def seed_users():
    fake = Faker()
    demo = User(
        username='Demo', email='demo@aa.io', password='password', about=fake.text(200),profile_photo="https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', about=fake.text(200),profile_photo="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', about=fake.text(200),profile_photo="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")
    kristy = User(
        username='kristy', email='zhang@aa.io', password='password', about=fake.text(200),profile_photo="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")
    xin = User(
        username='xin', email='xin@aa.io', password='password', about=fake.text(200),profile_photo="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(kristy)
    db.session.add(xin)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
