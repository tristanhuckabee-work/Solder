from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, URL, Optional
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


class SignUpForm(FlaskForm):
    firstName = StringField('firstname', validators=[DataRequired(message='First Name is Required')])
    lastName = StringField('lastname', validators=[DataRequired(message='Last Name is Required')])
    email = StringField('email', validators=[DataRequired(message='eMail is Required'), user_exists])
    password = StringField('password', validators=[DataRequired(message='Password is Required')])
    profilePic = StringField('profile_pic', validators=[Optional(), URL(message='Please provide a valid URL.')])
