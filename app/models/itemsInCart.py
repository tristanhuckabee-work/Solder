from .db import db


class ItemsInCart(db.Model):
  __tablename__ = 'itemsInCart'

  id = db.Column(db.Integer, primary_key=True)
  item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
  cart_id = db.Column(db.Integer, db.ForeignKey('cart.id'), nullable=False)

  item = db.relationship('Item', back_populates='itemInCart')
  cart = db.relationship('Cart', back_populates='items')


  def to_dict(self):
    return {
      'item_id': self.item_id,
      'cart_id': self.cart_id
    }