import sys

import requests

from config import Config

def get_api_data():
    # DataSF limit on number of records per request is 50000. Having two requests
    # makes the API future proof for this particular resource. Currently the
    # resource only has ~670 records.
    numRecords = 50

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

    print r1

get_api_data()