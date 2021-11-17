from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,DecimalField,DateTimeField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Event
from datetime import datetime

def timeCheck(form, field):

    start_at_obj = datetime.strptime(field.data, '%m/%d/%y %H:%M:%S')
    end_at_obj = datetime.strptime(form.data['end_at'], '%m/%d/%y %H:%M:%S') 
    if start_at_obj > end_at_obj :
        raise ValidationError("Start time must be before end time.")


class EventForm(FlaskForm):
    host_id = IntegerField("hoster",validators=[DataRequired()])
    theme = StringField("theme", validators=[Length(max=1000),DataRequired()])
    description = StringField("description")
    poster = StringField("poster")
    city = StringField("city", validators=[Length(max=50),DataRequired()])
    state = StringField("state", validators=[Length(max=50),DataRequired()])
    lat = DecimalField("lat")
    lng = DecimalField("lng")
    start_at= StringField("start_at", validators=[timeCheck, DataRequired()])
    end_at = StringField("end_at", validators=[DataRequired()])