# uber-challenge: SF Food Truck Finder

Create a service that tells the user what types of food trucks might be found 
near a specific location on a map.

The data is available on DataSF: Food Trucks

The UX/UI is totally up to you. If you like, get creative and add additional features a user might find useful!

# review criteria
Clarity: does the README clearly explains the problem and solution?
Correctness: does the application do what was asked? If there is anything missing, does the README explain why it is missing?
Code quality: is the code simple, easy to understand, and maintainable? Are there any code smells or other red flags?
Testing: how thorough are the automated tests? Will they be difficult to change if the requirements of the application were to change?
UX: is the web interface understandable and pleasing to use?
Technical choices: do choices of libraries, databases, architecture etc. seem appropriate for the chosen application?

# Why SF Food Truck Finder?
It's hard to find food trucks
Description of the problem and solution.

# Constraints
## Technical
Up to 1000 requests per hour from SODA - the open data source providing the 
truck locations

50K records per page of SODA API 

Mobile Food Schedule dataset: https://data.sfgov.org/Economy-and-Community/Mobile-Food-Schedule/jjew-r69b
- has ~55000 records
- .csv of data - 20MB

Might make sense to run a job every 30 minutes that gets all the food truck data
for SF and updates a database with that data. 

## Users
240K people between 25-39 (30% of population via http://www.paragon-re.com/SF_Demographics/)
Request patterns will be irregular - volume in descending order:
- lunch (12-2)
- dinner (5-7)
- late night? (7-9)
- and higher on weekdays than weekends (work crowd vs foodies)? 

# App architecture
Whether the solution focuses on back-end, front-end or if it's full stack.
Reasoning behind your technical choices, including architectural. Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project.

Possible to grab all of the food truck 

# Links
Link to other code you're particularly proud of.
Link to your resume or public profile.
Link to to the hosted application where applicable.

# back-end
Therefore, feel free to mention in your README how much experience you have with the technical stack you choose, we will take note of that when reviewing your challenge.

# front-end
The front-end should ideally be a single page app with a single index.html linking to external JS/CSS/etc. You may take this opportunity to demonstrate your CSS3 or HTML5 knowledge.

We recommend using Backbone.js for front-end MVC, and recommend against using heavier front-end frameworks (like Angular, for example). That way we can get better insight into your thought process and your understanding of the framework itself.