from app.models import db, Photo
from faker import Faker

def seed_Rsvp():
    fake = Faker()
    photo1 = Photo(
        user_id = 2, event_id = 1, img_url="https://images.unsplash.com/photo-1557665223-671ea12d4d5d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2hpbmVzZSUyMGNvb2tpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", comment= fake.text(100), 
     )
    photo2 = Photo(
        user_id = 2, event_id = 1, status="https://images.unsplash.com/photo-1544780631-d7cc800ef62d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2hpbmVzZSUyMGNvb2tpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", comment= fake.text(100), 
    )
    photo3 = Photo(
        user_id = 2, event_id = 1, status="https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNoaW5lc2UlMjBjb29raW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60", comment= fake.text(100), 
    )
    photo4 = Photo(
        user_id = 5, event_id = 1, status="https://media.istockphoto.com/photos/japanese-dumplings-gyoza-with-pork-meat-and-vegetables-picture-id1133151212?b=1&k=20&m=1133151212&s=170667a&w=0&h=-XPU-BOpOepaVLcVsMuXyZNSml80XlY_KDFKsSWW8ug=", comment= fake.text(100), 
     )
    photo5 = Photo(
        user_id = 5, event_id = 1, status="https://media.istockphoto.com/photos/delicious-spicy-chicken-in-the-buffet-picture-id1307242973?b=1&k=20&m=1307242973&s=170667a&w=0&h=meIVN1ovgXqaRrceBv82Vih81C_ukTSp7256JjfgTaE=", comment= fake.text(100), 
     )
    
    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)
    db.session.add(photo4)
    db.session.add(photo5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_rsvps():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()