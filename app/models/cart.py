from .db import db


class Cart(db.Model):
  __tablename__ = 'carts'

  id = db.Column(db.Integer, primary_key=True)
  owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

  user = db.relationship('User', back_populates='cart')
  items = db.relationship('ItemsInCart', back_populates='cart')

  def to_dict(self):
    return {
      'owner_id': self.owner_id
    }