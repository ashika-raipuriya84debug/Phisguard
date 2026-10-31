from flask import Flask, render_template, request, redirect, session, jsonify
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "change_this_to_anything"

def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Anika123*&^",
        database="phishguard"
    )

SUSPICIOUS_WORDS = ["verify your account", "urgent", "click here", "won a prize",
                    "password expired", "login immediately", "bank details", "free gift"]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        name = request.form["full_name"]
        email = request.form["email"]
        password = request.form["password"]
        hashed = generate_password_hash(password)

        db = get_db()
        cur = db.cursor()
        cur.execute("INSERT INTO users (full_name, email, password) VALUES (%s, %s, %s)",
                    (name, email, hashed))
        db.commit()
        cur.close()
        db.close()
        return redirect("/login")
    return render_template("signup.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        db = get_db()
        cur = db.cursor()
        cur.execute("SELECT * FROM users WHERE email=%s", (email,))
        user = cur.fetchone()
        cur.close()
        db.close()

        if user and check_password_hash(user[3], password):
            session["user"] = user[1]
            return redirect("/")
        else:
            return render_template("login.html", error="Wrong email or password")
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect("/login")

@app.route("/check", methods=["POST"])
def check():
    data = request.get_json()
    input_type = data.get("input_type")
    input_data = data.get("input_data", "")

    lowered = input_data.lower()
    result = "safe"
    for word in SUSPICIOUS_WORDS:
        if word in lowered:
            result = "suspicious"
            break

    db = get_db()
    cur = db.cursor()
    cur.execute("INSERT INTO phishing_checks (input_type, input_data, result) VALUES (%s, %s, %s)",
                (input_type, input_data, result))
    db.commit()
    cur.close()
    db.close()

    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True)