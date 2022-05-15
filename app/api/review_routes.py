from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Item, User, Cart, ItemsInCart, Review, db

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/new', methods=['POST'])
@login_required
def createReview():
  pass

@review_routes.route('/<int:item>')
@login_required
def getItemReviews(item):
  reviews = Review.query.filter(Review.item_id == item).all()
  return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('/<int:item>/<int:id>', methods=['PATCH'])
@login_required
def updateReview(item, id):
  pass

@review_routes.route('/<int:item>/<int:id>', methods=['DELETE'])
@login_required
def deleteReview(item, id):
  pass