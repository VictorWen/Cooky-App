# CS-35L-Cooking-App
A website where users can create, edit, display, clone, and rate recipes.
Users can create accounts and login in and view their recipes.
Users can also search for recipe by name, ingredients, and popularity.


The website is split into a React frontend and a Express backend.
Both need to be running at the same time for the website to work properly.
The website also uses a firebase database for authentication and storage.
To run the website, you will need your own firebase database.

## Configuration

A .env.local file needs to be in both the frontend and api directories.
The .env.local file should include the identifying information for firebase database.
Additionally, a .json file containing the private key for the firebase needs to be in the api directory.
Then, the lines in **api/app.js**

```
const key_path = "./cs-35l-cooking-app-firebase-adminsdk-pfw6m-00878e5a37.json";
const db_url = "https://cs-35l-cooking-app-default-rtdb.firebaseio.com";
```

need to be changed respectively.

## Start

The backend api run on port 3001 and the frontend runs on port 3000.

The backend api can be started by running:

```
cd api
npm install
npm start
```

The frontend can be started by running:

```
cd frontend
npm install
npm start
```
