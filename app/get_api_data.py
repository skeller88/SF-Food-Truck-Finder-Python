import sys

import requests

from config import Config
from util import server_helpers

def get_api_data():
    # DataSF limit on number of records per request is 50000. Having two requests
    # makes the API future proof for this particular resource. Currently the
    # resource only has ~670 records.
    numRecords = 50000

    headers = {
        'X-App-Token': Config.APP_TOKEN
    }

    payload_1 = {
        '$limit': numRecords,
        '$order': ':id',
    }

    payload_2 = {
        '$limit': numRecords,
        '$offset': numRecords,
        '$order': ':id',
    }

    r1 = requests.get(Config.FOOD_TRUCK_URL, params=payload_1, headers=headers)
    r2 = requests.get(Config.FOOD_TRUCK_URL, params=payload_2, headers=headers)

    all_food_trucks = r1.json() + r2.json()
    food_truck_docs = server_helpers.convert_data_to_docs(all_food_trucks)

    print 'Downloaded', len(food_truck_docs), 'food trucks from DataSF.'

get_api_data()