from app.models import db, Cart


# Adds a demo user, you can add other users here if you want
def seed_carts():
    demo = Cart(owner_id = 1)
    marnie = Cart(owner_id = 2)
    bobbie = Cart(owner_id = 3)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()