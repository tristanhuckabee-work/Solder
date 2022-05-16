from app.models import db, Cart


# Adds a demo user, you can add other users here if you want
def seed_carts():
    demo = Cart(owner_id = 1)
    marnie = Cart(owner_id = 2)
    bobbie = Cart(owner_id = 3)
    david = Cart(owner_id = 4)
    brett = Cart(owner_id = 5)
    toby = Cart(owner_id = 6)
    maria = Cart(owner_id = 7)
    candice = Cart(owner_id = 8)
    jesus = Cart(owner_id = 9)
    admin = Cart(owner_id = 10)

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