import os

from pymongo import MongoClient


class DB:
    connection_string = os.environ.get('MONGOHQ_URL',
                                       'mongodb://127.0.0.1:27017/foodtrucks')
    # TODO(shane): don't hard code production database name
    database_name = 'app34296442' if os.environ.get('MONGOHQ_URL') \
        else 'foodtrucks'
    connection = MongoClient(connection_string)
    db = connection[database_name]
    food_trucks = db.foodtrucks