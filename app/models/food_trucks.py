

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
    # TODO(shane): does this pattern work in python too?
    limit = options['limit'] or 10
    within = (options['within'] if options['within'] else options['within'] * meters_per_mile)
    return 4

def update_food_trucks(food_trucks):
    return 'updated'