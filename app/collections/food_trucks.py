import pymongo


from app.config import DB


food_trucks = DB.food_trucks
radius_of_earth_in_miles = 3959
meters_per_mile = 1609.34

def find_nearest(options):
    """Finds a certain amount of food trucks within a certain radius of a
    coordinate.

    Args:
      @param {options} object - contains the following keys:
      'coordinates' - [longitude, latitude],
      'limit' - number of food trucks to return,
      'within' - radius to search within, in miles
      @param {callback} function - expects an Error object as 1st parameter and
      array as 2nd parameter."""
    limit = options.get('limit', 10)
    within = options.get('within', 2)
    within *= meters_per_mile


    food_trucks.ensure_index([('location', pymongo.GEOSPHERE)])

    # query is a 'dict' - {'ok': boolean, 'result': list}
    query = food_trucks.aggregate([
        {
            '$geoNear': {
                'distanceField': 'distance',
                # This query must have the property 'spherical: true'.
                # Because of that, the distance is returned in meters and
                # needs to be converted to miles.
                'distanceMultiplier': 1/meters_per_mile,
                'maxDistance': within,
                'near': {
                    'type': 'Point',
                    'coordinates': options['coordinates']
                },
                'spherical': True,
            },
        },
        {
            '$limit': limit
        },
            # $sort must be before $project to take advantage of indexes:
            # docs.mongodb.org/manual/reference/operator/aggregation/sort/
        {
            '$sort': {
                'distance': 1,
                'name': 1
            }
        },
        {
            '$project': {
                '_id': 0,
                'address': 1,
                'distance': 1,
                'fooditems': 1,
                'location': 1,
                'name': 1
            }
        },
    ])

    return query['result']

def update_food_trucks(updated):
    original = len(list(food_trucks.find()))
    food_trucks.drop()
    print 'Removed', original, 'existing food trucks.'

    food_trucks.insert(updated)
    new = list(food_trucks.find())
    print 'Replaced with', len(new), 'food trucks.'
