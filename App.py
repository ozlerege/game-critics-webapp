from flask import Flask, jsonify, request, redirect, url_for, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import secrets
import os
from flask_login import (
    LoginManager,
    login_user,
    login_required,
    UserMixin,
    current_user,
    logout_user,
)

app = Flask(__name__)
app.config["SECRET_KEY"] = secrets.token_hex(16)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///site.db"
login_manager = LoginManager()
login_manager.init_app(app)
db = SQLAlchemy(app)


class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    platform = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        """Neccessary function for Flask Login"""
        return "<User %r" % self.username

    def get_username(self):
        """Neccessary function for Flask Login"""
        return self.username

    def get_id(self):
        """Neccessary function for Flask Login"""
        return self.id


@login_manager.user_loader
def load_user(user_id):
    """Neccessary function for Flask Login"""
    return Users.query.get(int(user_id))


@app.route("/signup", methods=["GET", "POST"])
def users():
    user_exists = True
    if request.method == "POST":
        db.create_all()
        # Create a new user and add to the database
        username = request.json["username"]
        password = request.json["password"]
        genre = request.json["genre"]
        platform = request.json["platform"]

        check_username = Users.query.filter_by(username=username).first()
        if not check_username:
            user = Users(
                username=username, password=password, genre=genre, platform=platform
            )
            db.session.add(user)
            db.session.commit()
            print(Users.query.all())
            return jsonify({"user_exist": not user_exists})

        else:
            print("Username already exists")
            return jsonify({"user_exist": user_exists})
    return ""


@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.json["username"]
        password = request.json["password"]

        check_user = Users.query.filter_by(username=username, password=password).first()
        if check_user is not None:
            print("user exists")
            login_user(check_user, remember=True)
            return jsonify({"user_exist": True})
        else:
            return jsonify({"user_exist": False})
    return ""


@app.route("/homepage", methods=["GET", "POST"])
@login_required
def homepage():
    if request.method == "GET":
        return jsonify({"current_user": current_user.username})
    return ""


@app.route("/profile", methods=["GET", "POST"])
@login_required
def profile():
    if request.method == "GET":
        return jsonify(
            {
                "current_user_username": current_user.username,
                "current_user_genre": current_user.genre,
                "current_user_platform": current_user.platform,
            }
        )
    return ""


@app.route("/logout")
@login_required
def logout():
    """Function to log user  out and redirect to login page"""
    logout_user()
    return jsonify({"user_logged_out": True})


if __name__ == "__main__":
    app.run(debug=True)
