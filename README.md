# The SF Food Truck Finder API

An API service that, given a set of coordinates, returns food trucks likely to be nearby.

[API link](http://sf-food-truck-finder.herokuapp.com/).

# Why SF Food Truck Finder?
It's hard to find food trucks nearby in San Francisco. Yelp does not have the data, and scouring the twitter feeds of food trucks takes a lot of time and existing knowledge of the names of the food trucks.

DataSF provides an API with access to food truck information, as well as other data sets. This project is an API specifically built for the food truck data set only.

# App architecture
The project focuses on the back-end. Using Heroku scheduler and Node, a worker task downloads all of the data from the DataSF dataset and updates a MongoDB database also deployed on Heroku via the [Compose](https://www.compose.io/) addon. Request patterns are irregular and in the same time zone, so background jobs are  scheduled at 4am, when no users are using the app.

For an I/O heavy application running on a single server due to cost constraints, an asynchronous platform/framework was the logical choice. Node was chosen over another asynchronous solution like Tornado because 1) Node has a larger community than Tornado or Twisted (measured by posts on Stack Overflow), and 2) I already know Node and time for this project was limited, making it not feasible to learn a new asynchronous server platform/framework.

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

# Development
Run `npm install` for dependencies, `npm start` to start the express server, `mongod` to start the mongodb server, `node bin/getAPIData` to populate the local database, and `npm test` to run tests.

# Next steps for app

Paging, throttling, and authentication on the backend. Allowing for more complicated queries.

Mobile-first front end that uses the google maps API and allows users to set query parameters via a GUI.

Use the [Mobile Food Schedule](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Schedule/jjew-r69b) dataset to only show trucks open at the current time.

Create a task that generates categories for the food trucks (American, Chinese, Mexican), and allow the user to filter food trucks based on categories.

# Links
[Other code I'm proud of](https://github.com/skeller88/career-buddy).
[My public portfolio](www.shanemkeller.com/portfolio/).
