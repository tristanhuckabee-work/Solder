from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, URL, Optional
from app.models import Review


class CreateReviewForm(FlaskForm):
  rating = StringField('rating', validators=[DataRequired(message='Rating is Required')])