from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Item, User, Cart, ItemsInCart, Review, db
from app.forms import CreateReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/new', methods=['POST'])
@login_required
def createReview():
  form = CreateReviewForm()
  data = request.get_json(force=True)
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit:
    print(f'\n\n{data}\n\n')
    review = Review(
      item_id=data['item_id'],
      user_id=data['user_id'],
      content=data['content'],
      rating=data['rating']
    )
    db.session.add(review)
    db.session.commit()

    return review.to_dict()
  else:
    return {'message': 'naw fam'}


@review_routes.route('/<int:item>')
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