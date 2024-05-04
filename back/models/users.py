from db_config import get_db
from werkzeug.security import generate_password_hash, check_password_hash

db= get_db()

class users(db.Model):
    '''Data for ON/OFF should be dumped in this table.'''

    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role = db.Column(db.String(80), nullable=False,default="member")
    name = db.Column(db.String(80), nullable=False)
    companie = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False,unique=True)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return '<email %r>' % self.email

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'companie': self.companie,
            'role': self.role
        } 