# The SF Food Truck Finder API

An API service that, given a set of coordinates, returns food trucks likely to be nearby.

[API link](http://sf-food-truck-finder.herokuapp.com/).

# review criteria
Clarity: does the README clearly explains the problem and solution?
Correctness: does the application do what was asked? If there is anything missing, does the README explain why it is missing?
Code quality: is the code simple, easy to understand, and maintainable? Are there any code smells or other red flags?
Testing: how thorough are the automated tests? Will they be difficult to change if the requirements of the application were to change?
UX: is the web interface understandable and pleasing to use?
Technical choices: do choices of libraries, databases, architecture etc. seem appropriate for the chosen application?

# Why SF Food Truck Finder?
It's hard to find food trucks nearby in San Francisco. Yelp does not have the data, and scouring the twitter feeds of food trucks takes a lot of time and existing knowledge of the names of the food trucks.

DataSF provides an API with access to food truck information, as well as other data sets. This project is an API specifically built for the food truck data set only.

# Constraints
## Technical
Up to 1000 requests per hour from SODA - the open data source providing the
truck locations

50K records per page of SODA API

Mobile Food Schedule dataset: https://data.sfgov.org/Economy-and-Community/Mobile-Food-Schedule/jjew-r69b
- has ~55000 records
- .csv of data - 20MB

## Users
240K people between 25-39 (30% of population via http://www.paragon-re.com/SF_Demographics/)
Request patterns will be irregular - volume in descending order:
- lunch (12-2)
- dinner (5-7)
- late night? (7-9)
- and higher on weekdays than weekends (work crowd vs foodies)?

# App architecture
The project focuses on the back-end. Using Heroku scheduler and Node, a worker task downloads all of the data from the DataSF dataset and updates a MongoDB database also deployed on Heroku via the [Compose](https://www.compose.io/) addon.

I had never done a project involving spatial queries, so I looked into geo-based databases. Currently, the most popular two are MongoDB and PostGIS, a spatial database extender for PostgreSQL.

There was no clear winner between the two. Here's what they are equal on:
- built-in geospatial indexing and querying
- available as addons on Heroku (the planned platform for the app)
- extensive project documentation
- current tutorials available online

PostGIS appears to have more features than MongoDB's geospatial capabilities, and being a SQL solution it can handle more complex transactions. However, the API only needs to handle nearest neighbor queries.

So, MongoDB was chosen for several reasons:
- The Compose addon is half the price of the Postgres with PostGIS addon on Heroku.
- The Heroku PostGIS addon is in public beta, while the Compose addon is not.
- The [MongoDB documentation](http://docs.mongodb.org/manual/applications/geospatial-indexes/) on geospatial indexing (about 6 pages) is much smaller and easier to digest than that of PostGIS (684 pages), and both databases provide the desired feature of finding the nearest neighbors.
- I didn't have that much experience with MongoDB and wanted to get more experience with it :).

TODO - discuss schema and transactions.

# Links
[Other code I'm proud of](https://github.com/skeller88/career-buddy).
[My public portfolio](www.shanemkeller.com/portfolio/).
