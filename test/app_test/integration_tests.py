import json
import unittest

from app import app

class TestFoodtrucksRoute(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True

        self.app = app.test_client()

    def test_get_food_trucks_near_sf(self):
        options = {
            'limit': 10,
            'within': 10,
            # sf latitude and longitude
            'latitude': 37.7111428086172,
            'longitude': -122.390768390822,
        }

        query_string = ('?longitude={longitude}&latitude={latitude}&limit='
                        '{limit}&within={within}'.format(**options))

        rv = self.app.get('/foodtrucks' + query_string)
        self.assertEqual(rv.status_code, 200)

        results = json.loads(rv.data)
        self.assertGreater(len(results), 0)

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

    def test_get_food_trucks_near_sj(self):
        options = {
            'limit': 10,
            'within': 10,
            # sj latitude and longitude
            'latitude': 37.3382,
            'longitude': 121.8863,
        }

        query_string = ('?longitude={longitude}&latitude={latitude}&limit='
                        '{limit}&within={within}'.format(**options))

        rv = self.app.get('/foodtrucks' + query_string)
        self.assertEqual(rv.status_code, 200)

        results = json.loads(rv.data)
        self.assertEqual(len(results), 0)
