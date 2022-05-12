from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, URL, Optional
from app.models import Item


class CreateItemForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(message='Name is Required')])
  description = StringField('description', validators=[DataRequired(message='Description is Required')])
  price = StringField('price', validators=[DataRequired(message='Price is Required')])