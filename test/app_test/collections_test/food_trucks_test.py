import unittest

class TestFoodTrucks(unittest.TestCase):
    def setUp(self):
        self.foo = 'bar'

    def test_something(self):
        self.assertEqual(self.foo, 'bar')