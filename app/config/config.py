import os


class Config(object):
    # DataSF API
    APP_TOKEN = 'S9xZv2avu4REIdEZhsDGgglvS'

    BASE_DIR = os.path.abspath(os.path.dirname(__file__))

    FOOD_TRUCK_URL = 'https://data.sfgov.org/resource/rqzj-sfat.json'

    # Application threads. A common general assumption is
    # using 2 per available processor cores - to handle
    # incoming requests using one and performing background
    # operations using the other.
    THREADS_PER_PAGE = 2

