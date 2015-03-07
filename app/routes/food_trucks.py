from flask import request


from app.models import food_trucks

def find():
    valid_params = {
        'latitude': True,
        'limit': True,
        'longitude': True,
        'within': True,
    }

    params = request.args

    for param in params:
        if param not in valid_params:
            return 'Invalid Params!'

    try:
        # TODO(shane): make translation of query string to integers
        # into middleware or an inner function in this route handler.
        # TODO(shane): changing the default values of "limit" and "within" may
        # cause certain tests to fail. Make less brittle by storing the
        # default values in a config file.
        limit = int(params.get('limit')) if params.get('limit') else 10
        within = int(params.get('within')) if params.get('within') else 2
        longitude = float(params.get('longitude')) if (params.get('longitude')
        ) else None
        latitude = float(params.get('latitude')) if (
            params.get('latitude')) else None
    except ValueError as e:
        return e

    if not (latitude and longitude):
        return 'Both latitude and longitude must be defined.'

    if limit <= 0 or within <= 0:
        return 'Limit and within must be >= 0.'

    coordinates = [longitude, latitude]

    options = {
        'coordinates': coordinates,
        'limit': limit,
        'within': within
    }

    a = food_trucks.find_nearest()

    print a
    return 'foo'
