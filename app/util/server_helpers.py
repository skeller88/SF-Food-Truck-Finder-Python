import math


def convert_data_to_docs(food_trucks_data):
    def convert(food_truck):
        # TODO(shane): think of a better way to handle missing coordinates
        latitude = float(food_truck.get('latitude', 0))
        longitude = float(food_truck.get('longitude', 0))

        if math.isnan(latitude) or math.isnan(longitude):
            latitude = longitude = 0

        return {
            'address': food_truck.get('address'),
            'fooditems': food_truck.get('fooditems'),
            'location': {
                'type': 'Point',
                'coordinates': [longitude, latitude]
            },
            'name': food_truck.get('applicant')
        }

    return map(convert, food_trucks_data)