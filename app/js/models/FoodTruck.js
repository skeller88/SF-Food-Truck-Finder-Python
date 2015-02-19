$ = require('jquery');
Backbone = require('backbone');
Backbone.$ = $;

/**
* @param {Object} attributes
* @param {string} attributes.address - location of food truck
* @param {string} attributes.name    - name of food truck
* @param {string} attributes.serves  - food served by the food truck
*/

module.exports = Backbone.Model.extend({
    defaults: {
        'address': 'No address for this food truck',
        'applicant': 'Unnamed food truck',
        'fooditems': 'No food items listed'
    }
});