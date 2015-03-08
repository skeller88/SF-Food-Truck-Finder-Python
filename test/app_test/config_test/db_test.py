import unittest

from app.config import DB


class TestDatabase(unittest.TestCase):
    def test_db_connection_object(self):
        self.assertTrue(DB.connection)

    def test_db_database_object(self):
        self.assertTrue(DB.db)

    def test_db_collection_object(self):
        self.assertTrue(DB.food_trucks)