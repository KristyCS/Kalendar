from re import L
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,DecimalField,DateTimeField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Event


def timeCheck(form, field):
    start_at = field.data
    end_at = form.data["end_at"]
    if start_at>=end_at :
        raise ValidationError("Start time must be before end time.")


class EventForm(FlaskForm):
    host_id = IntegerField("hoster",validators=[DataRequired()])
    theme = StringField("theme", validators=[Length(max=1000),DataRequired()])
    description = StringField("description")
    poster = StringField("poster")
    city = StringField("city", validators=[Length(max=50),DataRequired()])
    state = StringField("state", validators=[Length(max=50),DataRequired()])
    lat = DecimalField("lat", validators=[DataRequired()])
    lng = DecimalField("lng", validators=[DataRequired()])
    start_at= DateTimeField("start_at", validators=[DataRequired(),timeCheck])
    end_at = DateTimeField("end_at",validators=[DataRequired()])