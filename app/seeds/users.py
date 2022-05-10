from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName='John', lastName='Demo', email='demo@aa.io', password='password', profilePic='https://res.cloudinary.com/dzsgront4/image/upload/v1652200768/7084145293_e250170668_eoicuh.jpg', biography='This is you.')
    marnie = User(
        firstName='Marnie', lastName='Winston', email='marnie@aa.io', password='password', profilePic='https://res.cloudinary.com/dzsgront4/image/upload/v1652200841/National-I-Love-Horses-Day-640x514_gjojxp.jpg', biography="I'm just a good ole country gal looking to sell horse themed electronics.")
    bobbie = User(
        firstName='Bobbie', lastName='Hall', email='bobbie@aa.io', password='password', profilePic='https://res.cloudinary.com/dzsgront4/image/upload/v1652200985/4268bd9b4cfc02bc709bf452626882ec_ne0f5n.jpg', biography="Yeah, It's me...")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
