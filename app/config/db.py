import os

from pymongo import MongoClient


class DB:
    connection_string = os.environ.get('MONGOHQ_URL',
                                       'mongodb://127.0.0.1:27017')
    connection = MongoClient(connection_string)
    db = connection['foodtrucks']
    food_trucks = db.foodtrucks