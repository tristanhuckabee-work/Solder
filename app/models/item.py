from .db import db


class Item(db.Model):
  __tablename__ = 'items'

  id = db.Column(db.Integer, primary_key=True)
  seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  name = db.Column(db.String, nullable=False)
  description = db.Column(db.String)
  price = db.Column(db.String(10), nullable=False)
  pics = db.Column(db.String)

  seller = db.relationship('User', back_populates='items')
  itemInCart = db.relationship('ItemsInCart', back_populates='item')
  reviews = db.relationship('Review', back_populates='item', cascade='all, delete')

  def to_dict(self):
    pictures = ['']
    if self.pics is None:
      pictures = ['https://res.cloudinary.com/dta9dkzbk/image/upload/v1653077550/no-image-available_pbgdnv.jpg']
    else:
      pictures = self.pics

    return {
      'id': self.id,
      'name': self.name,
      'description': self.description,
      'price': self.price,
      'pics': pictures,
      'seller': self.seller.to_dict()
    }