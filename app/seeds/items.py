from app.models import db, Item


def seed_items():
  horse_laptop = Item(
      seller_id=2,
      name='Horse Painted Laptop',
      description="Beautifully painted laptop, send me your laptop and I'll paint a horse scene on it!!!",
      price='$80.00',
      pics = 'https://res.cloudinary.com/dzsgront4/image/upload/v1652201730/il_570xN.2020162781_af45_dgqbxw.webp,https://res.cloudinary.com/dzsgront4/image/upload/v1652202005/pd_x500_macbook_air_13-pad_750x1000_f8f8f8.u6_xunr2l.jpg'
  )
  horse_laptop = Item(
      seller_id=3,
      name='Cowboy Bebop Phone Case',
      description="Cowboy Bebop Phone Cases!",
      price='$30.00',
      pics = 'https://res.cloudinary.com/dzsgront4/image/upload/v1652202120/il_fullxfull.2916789972_agqa_vd2sck.webp'
  )

  db.session.add(horse_laptop)
  db.session.add(bebop_case)

  db.session.commit()