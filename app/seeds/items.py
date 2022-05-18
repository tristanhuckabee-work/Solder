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
  famicom = Item(
      seller_id=5,
      name='Super Famicom',
      description="System x 1\nAV Cable x 1\nPower AC Adaptor x 1\n Controller x 2",
      price='$80.00',
      pics = 'https://res.cloudinary.com/dta9dkzbk/image/upload/v1652910205/S18293861001_kmjvvr.jpg,https://res.cloudinary.com/dta9dkzbk/image/upload/v1652910213/S18293861010_bz8dou.jpg'
  )
  win_pc = Item(
      seller_id=6,
      name='GPD Win 1 Handheld Gaming PC',
      description="OS:Windows 10 Home 64bit\nCPU: Intel Atom x7-Z8750 1.6GHz\nMemory: 4GB\nRun your favorite retro games in windows with game controls! A windows game pad that can fit in your pocket!\n\nRefubished.",
      price='$319.00',
      pics = 'https://res.cloudinary.com/dta9dkzbk/image/upload/v1652910931/s-l300_rqpbgv.jpg,https://res.cloudinary.com/dta9dkzbk/image/upload/v1652910946/s-l300_loqwcb.jpg'
  )
  power_glove = Item(
      seller_id=5,
      name='Pax Power Glove Nintendo Famicom NES Controller',
      description="Operation is not confirmed on this device.\nThere are some scratches and dirt on the body by using. No big damage.",
      price='$169.98',
      pics = 'https://res.cloudinary.com/dta9dkzbk/image/upload/v1652911229/s-l300_aw5hao.jpg'
  )
  sidekick = Item(
      seller_id=4,
      name='T-Mobile Motorola Sidekick Slide Q700 Black',
      description="Great Shape! Comes with charger and battery!",
      price='$149.95',
      pics = 'https://res.cloudinary.com/dta9dkzbk/image/upload/v1652911374/s-l300_ldyuvu.jpg,https://res.cloudinary.com/dta9dkzbk/image/upload/v1652911377/s-l300_f8vxag.jpg,https://res.cloudinary.com/dta9dkzbk/image/upload/v1652911381/s-l300_komkk6.jpg'
  )
  switch_case = Item(
      seller_id=10,
      name='Purple Cat Dog Switch Case',
      description="Nintendo Switch Case, Purple and Pink Cat Dog Switch Silicone Case, Nintendo Switch Carrying Case, Protective Case Cover, Switch Accessories",
      price='$25.55',
      pics = 'https://res.cloudinary.com/dta9dkzbk/image/upload/v1652911647/il_794xN.3726903528_82kg_np3owj.webp,https://res.cloudinary.com/dta9dkzbk/image/upload/v1652911652/il_794xN.3774486725_jr24_tozccz.webp,https://res.cloudinary.com/dta9dkzbk/image/upload/v1652911655/il_794xN.3726897526_hkwl_sors0w.webp'
  )
  book_phone = Item(
      seller_id=8,
      name='iPhone 12 Wallet, Leather Case',
      description="This listing is for a PERSONALIZED leather iPhone 6, iPhone 6PLUS, iPhone 6S, iPhone 6S Plus, iPhone 7, iPhone 7 Plus, iPhone 8, iPhone 8 Plus, iPhone X, iPhone XS, iPhone XS MAX, iPhone XR, iPhone 11, iPhone 11 Pro, iPhone 11 Pro Max, iPhone 12 Pro Max, iPhone 12 Pro, iPhone 12, iPhone 12 mini\nThe wallet is designed around the size of an iPhone, not for the length of unfolded currency. Money has to be folded to fit inside.",
      price='$38.00',
      pics = 'https://res.cloudinary.com/dta9dkzbk/image/upload/v1652911837/il_794xN.2220735078_r7ww_wiu34k.webp,https://res.cloudinary.com/dta9dkzbk/image/upload/v1652911831/il_794xN.2268329611_6x0t_uvtgfa.webp,https://res.cloudinary.com/dta9dkzbk/image/upload/v1652911841/il_794xN.2268337741_7lks_oukinm.webp'
  )
  loose_pcb = Item(
      seller_id=8,
      name='Loose PCBs (Jumbo)',
      description="Great for steampunk, crafts, art, costumes and more! Boards will not work as intended.\nMost boards come from medium-high end stereo/receiver equipment.\nJumbo size is at least 48sq.in of size for each board.",
      price='$10.00',
      pics = 'https://res.cloudinary.com/dta9dkzbk/image/upload/v1652911958/il_794xN.3893295745_fbs6_cp8uom.jpg'
  )

  db.session.add(horse_laptop)
  db.session.add(bebop_case)
  db.session.add(airpods)
  db.session.add(gameboy)
  db.session.add(keyboard_cap)
  db.session.add(famicom)
  db.session.add(win_pc)
  db.session.add(power_glove)
  db.session.add(sidekick)
  db.session.add(switch_case)
  db.session.add(book_phone)
  db.session.add(loose_pcb)

  db.session.commit()