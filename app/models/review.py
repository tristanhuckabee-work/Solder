from .db import db
from datetime import datetime


class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key=True)
  item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  rating  = db.Column(db.Integer, nullable=False)
  content = db.Column(db.String)
  created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

  item = db.relationship('Item', back_populates='reviews')
  user = db.relationship('User', back_populates='reviews')


  def to_dict(self):
    return {
      'id': self.id,
      'rating': self.rating,
      'content': self.content,
      'updated_at': self.updated_at,
      'item': self.item.to_dict(),
      'user': self.user.to_dict()
    }