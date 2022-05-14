from .db import db


class ItemsInCart(db.Model):
  __tablename__ = 'itemsInCart'

  id = db.Column(db.Integer, primary_key=True)
  item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
  cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
  count = db.Column(db.Integer, nullable=False)

  item = db.relationship('Item', back_populates='itemInCart')
  cart = db.relationship('Cart', back_populates='items')


  def to_dict(self):
    return {
      'id': self.id,
      'item_id': self.item_id,
      'cart_id': self.cart_id,
      'count': self.count
    }