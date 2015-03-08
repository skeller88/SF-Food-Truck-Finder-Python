import unittest

from app.config import db
from app.collections import food_trucks
import get_api_data

# TODO(shane): finish adding failure messages to tests.
class TestFoodTrucks(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Open the database in case the database was closed by another test.
        limit = 10
        within = 10

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
        print food_truck_keys
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
