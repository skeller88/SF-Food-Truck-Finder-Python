from pymongo import MongoClient


class DB:
    connection = MongoClient('localhost', 27017)
    db = connection['foodtrucks']
    food_trucks = db.foodtrucks