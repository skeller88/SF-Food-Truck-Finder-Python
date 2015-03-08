import os

from pymongo import MongoClient


class DB:
    # connection_string = os.environ.get('MONGOHQ_URL',
    #                                    'mongodb://127.0.0.1:27017/foodtrucks')

    # database_name = 'app34296442' if os.environ.get('MONGOHQ_URL') \
    #     else 'foodtrucks'
    # TODO(shane): database authentication fails in production when using above
    # two lines. Fix so not necessary to hard code production database name
    connection_string = ('mongodb://heroku:1JLvaxj4V7uRUMcZttsFUgMtsJZJz2qVRNfw'
                         'nG0iYGwY_Q3yVWJuWEv-2nj-2iI6lr6JZFbzS806VchyEhmUXg@ca'
                         'ndidate.16.mongolayer.com:10780,candidate.0.mongolaye'
                         'r.com:10817/app34296442')

    database_name = 'app34296442'
    connection = MongoClient(connection_string)
    db = connection[database_name]
    food_trucks = db.foodtrucks