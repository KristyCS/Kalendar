from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def statusCheck(form, field):
    status = field.data
    if status not in ['no rsp','no', 'yes', 'maybe'] :
        raise ValidationError("status can only be 'no rsp', \
            'no', 'yes' or 'maybe'.")

class RsvpForm(FlaskForm):
    user_id = IntegerField("user_id",validators=[DataRequired()])
    event_id = IntegerField("event_id", validators=[DataRequired()])
    status = StringField("status",validators=[statusCheck, DataRequired()])
    comment = StringField("label")