# mean-kitchen-app
A small kitchen app using the MEAN stack.
This app has been **written from scratch** without making use of any tools such as mean.io.

1. Angular.js
2. Node.js
3. Express.js
4. MongoDB

Other major server side or dev libraries / frameworks used:
* Gulp
* Jade
* Stylus
* Mongoose
* Passport

Other major client side libraries / frameworks used:
* Bootstrap
* LoDash
* Toastr

### Prerequisites
1. Node Package Manager (npm) and Node.js
2. Bower

Install required packages using the npm by running:
```
npm install
```
in the project root folder.

### Running
In order to run the server you need to install Node.js, then run the command:
```
node server.js
```
in the project root folder.
The server will run on port 3030.

### Access
Once the Node.js server is running, go to:
```
http://localhost:3030
```
to access the website.

### Heroku and MongoLab
The project is also deployed on Heroku and accessible at:
```
https://sheltered-sea-8819.herokuapp.com
```

There is a separate production database hosted by MongoLab.

### Pre-defined Users
There are two predefined users on the system:
```
USERNAME    PASSWORD
admin       admin
user        user
```

### Pre-populated Data
The database is pre-populated with dummy recipes, allowing users to test any of the required features.

### Advanced Features
Login is required to access advanced features, such as starring recipes.

### Project Structure.
The project comprises of two parts:
1. The client side code (public folder).
2. The server side code (server folder).

### Client Code
The client side code is merged and minified (commented out for the sake of simplicity)
into the app.min.js file. To compile the client side code, run:
```
gulp watch
```
in the project root folder.

The client side side code comprises of small Angular.js components, which contain
the module configuration, partial views and controllers. The names are pretty self explanatory.

### Server Code
The server side code comprises of several folders:
* config - holds the configuration and initialization of basic modules
* controllers - holds the controllers which handle the API calls to the backend
* includes - server side jade templates
* models - MongoDB schemas and models
* util - several utility packages
* views - main server side rendered views

### Features
All features have been implemented.

### recipe_list.feature Comments
*ui-bootstrap* library has been used for the pagination element.
For the sake of simplicity, pagination and filtering is done on the client side.
Alternatively, this can also be done on the server side (better scaling), if the filters and page number
are send as a request to the backend, and then the appropriate page will be returned.

### filter_recipes.feature Comments
As mentioned above, filtering is also done on the client side, for the sake of simplicity.
Searching uses lowercase matching, therefore the two search terms 'Chicken' and 'chicken'
will yield the same search results.

### recipe.feature Comments
There are only three images used for the recipe details page.
These images are not hosted locally.
Typically, they would be hosted on our own CDN server.

It was also assumed that all ingredients are main ingredients, and thus displayed in the search results.

### star.feature Comments
Recipes can be starred only by logged in users.