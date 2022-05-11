from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Item, User, Cart, ItemsInCart, db
from app.forms import CreateItemForm

item_routes = Blueprint('items', __name__)

@item_routes.route('/new', methods=['POST'])
@login_required
def createItem():
  form = CreateItemForm()
  data = request.get_json()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    item = Item(
      seller_id = data['owner_id'],
      name = data['name'],
      description = data['description'],
      price = f"${data['price']}"
    )
    db.session.add(item)
    db.session.commit()

    return item.to_dict()
  else:
    return { 'errors': form.errors }

@item_routes.route('/')
@login_required
def getAllItem():
  items = Item.query.all()
  for item in items:
    print(f'\n\n{item.to_dict()}')
  
  return {'items': [item.to_dict() for item in items]}

@item_routes.route('/<int:id>/edit', methods=['PATCH'])
@login_required
def updateItem():
  return 'update'

@item_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def deleteItem():
  return 'delete'