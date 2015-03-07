from flask import Flask


import routes.food_trucks as food_trucks

app = Flask(__name__, static_url_path='')

app.config.from_object('app.config')

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/foodtrucks')
def find_food_trucks():
    return food_trucks.find()
