from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Item, User, Cart, ItemsInCart, db
from app.forms import CreateItemForm, EditItemForm

from app.s3config import ( upload_file_to_s3, allowed_file, get_unique_filename )

item_routes = Blueprint('items', __name__)


@item_routes.route('/images', methods=['POST'])
@login_required
def upload_image():
  if "image" not in request.files:
    return {"errors": "image required"}, 400
  image = request.files["image"]

  if not allowed_file(image.filename):
    return {"errors": "file type not permitted"}, 400
  image.filename = get_unique_filename(image.filename)

  upload = upload_file_to_s3(image)

  if "url" not in upload:
    return upload, 400
  url = upload["url"]
  
  return {'url': url}

@item_routes.route('/new', methods=['POST'])
@login_required
def createItem():
  form = CreateItemForm()
  data = request.get_json(force=True)
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    item = Item(
      seller_id = data['owner_id'],
      name = data['name'],
      description = data['description'],
      price = f"${data['price']}",
      pics = data['pics']
    )
    db.session.add(item)
    db.session.commit()

    return item.to_dict()
  else:
    errors = [form.errors[error] for error in form.errors]
    return { 'errors': errors }

@item_routes.route('/')
def getAllItem():
  items = Item.query.all()
  users = User.query.all()

  return {'items': [item.to_dict() for item in items]}

@item_routes.route('/<int:id>/edit', methods=['PATCH'])
@login_required
def updateItem(id):
  data = request.get_json(force=True)

  item = Item.query.get(id)

  item.name = data['name']
  item.description = data['description']
  item.price = f"${data['price']}"
  item.pics = data['pics']

  db.session.commit()

  return item.to_dict()

@item_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def deleteItem(id):
  item = Item.query.get(id)

  db.session.delete(item)
  db.session.commit()

  return item.to_dict()