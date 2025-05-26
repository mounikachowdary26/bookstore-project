from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import os

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bookstore.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Replace with a secure key in production
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(100), nullable=False)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    newPrice = db.Column(db.Float, nullable=False)
    oldPrice = db.Column(db.Float, nullable=False)
    coverImage = db.Column(db.String(200), nullable=False)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    address_city = db.Column(db.String(100), nullable=False)
    address_country = db.Column(db.String(100), nullable=False)
    address_state = db.Column(db.String(100), nullable=False)
    address_zipcode = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    items = db.relationship('OrderItem', backref='order', lazy=True)

class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)

# Create database tables
with app.app_context():
    db.create_all()
    # Seed some initial book data if the table is empty
    if Book.query.count() == 0:
        books = [
            {
                "title": "The Great Adventure",
                "description": "An epic tale of exploration and discovery in uncharted lands.",
                "category": "adventure",
                "newPrice": 15.99,
                "oldPrice": 20.99,
                "coverImage": "books/adventure1.png"
            },
            {
                "title": "Business Mastery",
                "description": "A comprehensive guide to succeeding in the modern business world.",
                "category": "business",
                "newPrice": 25.99,
                "oldPrice": 30.99,
                "coverImage": "books/business1.png"
            },
            {
                "title": "Horror Nights",
                "description": "A chilling collection of horror stories to keep you up at night.",
                "category": "horror",
                "newPrice": 12.99,
                "oldPrice": 18.99,
                "coverImage": "books/horror1.png"
            },
            {
                "title": "Fiction Fantasy",
                "description": "A magical journey through a world of fantasy and wonder.",
                "category": "fiction",
                "newPrice": 18.99,
                "oldPrice": 22.99,
                "coverImage": "books/fiction1.png"
            }
        ]
        for book_data in books:
            book = Book(**book_data)
            db.session.add(book)
        db.session.commit()

# Routes
@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Bookstore API!"})

@app.route('/api/users/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    if not email or not password or not name:
        return jsonify({"error": "Email, password, and name are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    password_hash = generate_password_hash(password)
    new_user = User(email=email, password_hash=password_hash, name=name)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=email)
    return jsonify({"message": "User registered successfully", "access_token": access_token}), 201

@app.route('/api/users/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({"message": "Login successful", "access_token": access_token, "user": {"email": user.email, "name": user.name}}), 200

@app.route('/api/users/me', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    })

@app.route('/api/books', methods=['GET'])
def get_books():
    category = request.args.get('category')
    if category and category != "choose a genre":
        books = Book.query.filter_by(category=category.lower()).all()
    else:
        books = Book.query.all()
    return jsonify([{
        "id": book.id,
        "title": book.title,
        "description": book.description,
        "category": book.category,
        "newPrice": book.newPrice,
        "oldPrice": book.oldPrice,
        "coverImage": book.coverImage
    } for book in books])

@app.route('/api/books/<int:id>', methods=['GET'])
def get_book(id):
    book = Book.query.get_or_404(id)
    return jsonify({
        "id": book.id,
        "title": book.title,
        "description": book.description,
        "category": book.category,
        "newPrice": book.newPrice,
        "oldPrice": book.oldPrice,
        "coverImage": book.coverImage
    })

@app.route('/api/orders', methods=['POST'])
@jwt_required()
def create_order():
    data = request.get_json()
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    required_fields = ['name', 'phone', 'address']
    address_fields = ['city', 'country', 'state', 'zipcode']
    if not all(field in data for field in required_fields) or not all(field in data['address'] for field in address_fields):
        return jsonify({"error": "Missing required fields"}), 400

    if not data.get('productIDs'):
        return jsonify({"error": "No products provided"}), 400

    total_price = 0
    order_items = []
    for book_id in data['productIDs']:
        book = Book.query.get(book_id)
        if not book:
            return jsonify({"error": f"Book with ID {book_id} not found"}), 404
        total_price += book.newPrice
        order_items.append(OrderItem(book_id=book_id))

    new_order = Order(
        user_id=user.id,
        total_price=total_price,
        name=data['name'],
        email=current_user_email,
        phone=data['phone'],
        address_city=data['address']['city'],
        address_country=data['address']['country'],
        address_state=data['address']['state'],
        address_zipcode=data['address']['zipcode']
    )
    db.session.add(new_order)
    db.session.flush()  # Get the order ID before committing

    for item in order_items:
        item.order_id = new_order.id
        db.session.add(item)

    db.session.commit()
    return jsonify({"message": "Order created successfully", "order_id": new_order.id}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)