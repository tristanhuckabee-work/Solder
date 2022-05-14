from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Item, User, Cart, ItemsInCart, db

cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/new', methods=[''])
@login_required
def addToCart(payload):
  data = request.get_json()
  
  itemInCart = ItemsInCart(
    item_id=data['item_id'],
    cart_id=data['cart_id'],
    count  =data['count']
  )
  db.session.add(itemInCart)
  db.session.commit()

  return itemInCart.to_dict()

@cart_routes.route('/<int:user_id>')
@login_required
def getCart(user_id):
  cart = Cart.query.filter(Cart.owner_id == user_id).one()

  return {'cart': cart.to_dict()}

@cart_routes.route('/edit')
@login_required
def updateCart(id):
  pass

@cart_routes.route('/delete')
@login_required
def clearCart(id):
  pass