from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Item, User, Cart, ItemsInCart, db

cart_routes = Blueprint('cart', __name__)

# REMEMBER TO SEED UNDO, MIGRATE, UPGRADE, AND RESEED

@cart_routes.route('/new', methods=[''])
@login_required
def addToCart(payload):
  pass

@cart_routes.route('/')
@login_required
def getCart():
  pass

@cart_routes.route('/edit')
@login_required
def updateCart(id):
  pass

@cart_routes.route('/delete')
@login_required
def clearCart(id):
  pass