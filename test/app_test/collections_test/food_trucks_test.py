import unittest

from app.config import DB
from app.collections import food_trucks
from get_api_data import get_api_data

# TODO(shane): finish adding failure messages to tests.
class TestFoodTrucksFindNearest(unittest.TestCase):
    def test_find_food_trucks_near_sf(self):
        # Coordinates of a random food truck in San Francisco; highly likely that
        # these coordinates are within 10 miles of all of the other food trucks.
        sf_latitude = 37.7111428086172
        sf_longitude = -122.390768390822
        options = {
            'coordinates': [sf_longitude, sf_latitude]
        }

        results = food_trucks.find_nearest(options)
        self.assertGreater(len(results), 0,
                           'Should find food trucks near San Francisco.')

        food_truck = results[0]
        food_truck_keys = food_truck.keys()

        self.assertEqual(len(food_truck_keys), 5)

        expected_keys = [
            'address',
            'distance',
            'fooditems',
            'location',
            'name'
        ]

        self.assertItemsEqual(food_truck_keys, expected_keys)

    def test_find_food_trucks_near_sj(self):
        # San Jose's coordinates according to Google
        sj_latitude = 37.3382
        sj_longitude = 121.8863

        options = {
            'coordinates': [sj_longitude, sj_latitude]
        }

        results = food_trucks.find_nearest(options)

        self.assertEqual(len(results), 0,
                         'Should not find food trucks near San Jose.')


# TODO(shane): finish adding failure messages to tests.
class TestFoodTrucksUpdate(unittest.TestCase):
    def test_update_food_trucks_collection(self):
        updated_food_trucks = [
            {
                'name': 'jimbo\'s cheese and tomatoes',
                'address': '123 jimbo lane',
                'fooditems': 'cheese, tomatoes',
                'location': {
                    'type': 'Point',
                    'coordinates': [-122.32, 37.71],
                },
            },
        ]

        food_trucks.update_food_trucks(updated_food_trucks)

        food_trucks_collection = DB.food_trucks
        updated_collection = list(food_trucks_collection.find())

        self.assertEqual(len(updated_collection), len(updated_food_trucks))

        # reset the collection
        get_api_data()
