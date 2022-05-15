from app.models import db, Item


def seed_items():
  horse_laptop = Item(
      seller_id=2,
      name='Horse Painted Laptop',
      description="Beautifully painted laptop, send me your laptop and I'll paint a horse scene on it!!!",
      price='$80.00',
      pics = 'https://res.cloudinary.com/dzsgront4/image/upload/v1652201730/il_570xN.2020162781_af45_dgqbxw.webp,https://res.cloudinary.com/dzsgront4/image/upload/v1652202005/pd_x500_macbook_air_13-pad_750x1000_f8f8f8.u6_xunr2l.jpg'
  )
  bebop_case = Item(
      seller_id=3,
      name='Cowboy Bebop Phone Case',
      description="Cowboy Bebop Phone Cases!",
      price='$30.00',
      pics = 'https://res.cloudinary.com/dzsgront4/image/upload/v1652202120/il_fullxfull.2916789972_agqa_vd2sck.webp'
  )
  airpods = Item(
      seller_id=1,
      name='Apple AirPods (2nd Gen) with Case',
      description="Slightly Used, Still Nice",
      price='$68.79',
      pics = 'https://res.cloudinary.com/dzsgront4/image/upload/v1652591986/145272_8ea0d7a7-cf24-4308-9129-673a8b0bf8a5_pzlxc6.avif,https://res.cloudinary.com/dzsgront4/image/upload/v1652591993/145272_6d84684e-efc3-4c8b-ad20-cc92ac7b74b5_meiipb.avif,https://res.cloudinary.com/dzsgront4/image/upload/v1652591997/145272_4f5412b9-359c-4eb4-8524-723cb86323aa_uiitmd.avif,https://res.cloudinary.com/dzsgront4/image/upload/v1652592000/145272_06b7e700-10a6-42e0-b61c-abfa5b9c9d33_x6kl0n.avif'
  )
  gameboy = Item(
      seller_id=4,
      name='Restored Gameboy Advance Glow in the Dark AquaGreen',
      description="These have been professionally refurbished. These have mod with ISP V2 LCD with better color and 10 level of brightness. They all have been clean inside out. We are confident that they performed as good as new and they all comes with 6 months warranty. Check out our store for more refurbished system like this one! Free Shipping and Free return for any reason. We guarantee that you will be happy with your purchase! This model use two AA batteries.",
      price='$100.95',
      pics = 'https://res.cloudinary.com/dzsgront4/image/upload/v1652592148/il_794xN.3911040487_1r5x_x3js4a.webp,https://res.cloudinary.com/dzsgront4/image/upload/v1652592155/il_794xN.3911040507_39i7_dqabja.webp,https://res.cloudinary.com/dzsgront4/image/upload/v1652592158/il_794xN.3863545324_egs0_quznov.webp'
  )
  keyboard_cap = Item(
      seller_id=4,
      name='Blue and Black Koi Keycap',
      description="Blue and Black Koi keycap for cherry MX keyboard - Is koi fish good luck? Koi Fish meaning in Japan is good fortune or luck they also are associated with perseverance in adversity and strength of purpose, the Koi fish symbolize good luck, abundance, and perseverance. Symbolic in Buddhism is to represent courage.",
      price='$20.00',
      pics = 'https://res.cloudinary.com/dzsgront4/image/upload/v1652592326/il_794xN.3553800680_ayqh_urgksn.webp,https://res.cloudinary.com/dzsgront4/image/upload/v1652592329/il_794xN.3553800382_6nnd_zsm07z.webp,https://res.cloudinary.com/dzsgront4/image/upload/v1652592334/il_794xN.3660392657_o4a5_pretld.webp'
  )

  db.session.add(horse_laptop)
  db.session.add(bebop_case)
  db.session.add(airpods)
  db.session.add(gameboy)
  db.session.add(keyboard_cap)

  db.session.commit()