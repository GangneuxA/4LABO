from db_config import get_db

db = get_db()

class job(db.Model):
    '''Data for ON/OFF should be dumped in this table.'''

    __tablename__ = 'job'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.String(80), nullable=False,default="loading")
    images = db.Column(db.String(80), nullable=False)
    commands = db.Column(db.JSON(), nullable=False)
    repo = db.Column(db.String(255), nullable=False)
    user = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False,
    )
    logs = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return '<id %r>' % self.id
    
    def to_json(self):
        return {
            'id': self.id,
            'user': self.user,
            'status': self.status,
            'commands': self.commands,
            'repo': self.repo,
            'logs': self.logs
        } 