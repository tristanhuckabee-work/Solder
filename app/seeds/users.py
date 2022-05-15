from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName='John', lastName='Demo', email='demo@aa.io', password='password', profilePic='https://res.cloudinary.com/dzsgront4/image/upload/v1652200768/7084145293_e250170668_eoicuh.jpg', biography='This is you.')
    marnie = User(
        firstName='Marnie', lastName='Winston', email='marnie@aa.io', password='password', profilePic='https://res.cloudinary.com/dzsgront4/image/upload/v1652200841/National-I-Love-Horses-Day-640x514_gjojxp.jpg', biography="I'm just a good ole country gal looking to sell horse themed electronics.")
    bobbie = User(
        firstName='Bobbie', lastName='Hall', email='bobbie@aa.io', password='password', profilePic='https://res.cloudinary.com/dzsgront4/image/upload/v1652200985/4268bd9b4cfc02bc709bf452626882ec_ne0f5n.jpg', biography="Yeah, It's me...")
    david = User(
        firstName='David', lastName='Webber', email='david@aa.io', password='password', profilePic='https://res.cloudinary.com/dzsgront4/image/upload/v1652591592/pexels-photo-1450116_gifsom.webp', biography="Description Type Wording")
    brett = User(
        firstName='Brett', lastName='Clements', email='brett@aa.io', password='password', profilePic='https://res.cloudinary.com/dzsgront4/image/upload/v1652591526/pexels-photo-432059_fbrsbd.webp', biography="Description Type Wording")
    toby = User(
        firstName='Toby', lastName='Smith', email='toby@aa.io', password='password', profilePic='https://res.cloudinary.com/dzsgront4/image/upload/v1652591495/pexels-photo-1680172_t34wqd.webp', biography="Description Type Wording")
    maria = User(
        firstName='Maria', lastName='Hernandez', email='maria@aa.io', password='password', profilePic='https://res.cloudinary.com/dzsgront4/image/upload/v1652591698/pexels-photo-3482526_oqnp7n.jpg', biography="Description Type Wording")
    candice = User(
        firstName='Candice', lastName='Washington', email='candice@aa.io', password='password', profilePic='https://res.cloudinary.com/dzsgront4/image/upload/v1652591663/pexels-photo-773371_dpeje8.jpg', biography="Description Type Wording")
    jesus = User(
        firstName='Jesus', lastName='Ortiz', email='jesus@aa.io', password='password', profilePic='https://res.cloudinary.com/dzsgront4/image/upload/v1652591456/pexels-nitin-khajotia-1516680_kq0mdh.jpg', biography="Description Type Wording")
    admin = User(
        firstName='Admin', lastName='Adminson', email='admin@aa.io', password='password', profilePic='https://res.cloudinary.com/dzsgront4/image/upload/v1652205992/IT000012498930-e1426124271973_eypgul.jpg', biography="Admin Account")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(david)
    db.session.add(brett)
    db.session.add(toby)
    db.session.add(maria)
    db.session.add(candice)
    db.session.add(jesus)
    db.session.add(admin)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
