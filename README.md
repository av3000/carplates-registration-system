# carplates-registration-system

Simple CRUD app to list, add, update, remove car number plates with their owner names.
Built using [Angular](https://angular.io/) for front end and [Node.js](https://nodejs.org/en/) for the backend API,
[MongoDB](https://github.com/mongodb/mongo) for the database. 
Visit documentation or read below how to install mongoDB on [Ubuntu](https://ubuntu.com/) OS.

## Installation pre-requisites

For running this project we need and npm installed on our machine. These are some tutorials to install node in different operating systems:

*Its important to install the latest version of Node*

- [Install Node and NPM on Windows](https://www.youtube.com/watch?v=8ODS6RM6x7g)
- [Install Node and NPM on Linux](https://www.youtube.com/watch?v=yUdHk-Dk_BY)
- [Install Node and NPM on Mac](https://www.youtube.com/watch?v=Imj8PgG3bZU)

# Setup

## Setup option using Docker

Make sure you have [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed on you machine.

```bash
# all you need is run
docker-compose up

# depending on your setup you may need to use
```bash
sudo docker-compose up
```

Thats it, the api is visible at port 8081 - [http://localhost:8081](http://localhost:8081)
and the angular app is visible at port 4200 - [http://localhost:4200](http://localhost:4200)

## Setup option to use locally

Download the repository
```bash
git clone https://github.com/av3000/carplates-registration-system.git
```

### Backend instructions

```bash
# run your mongodb from its installed directory
./mongodb
```

```bash
# go into the node backend folder
cd carplates-registration-system/api

# install required modules/libraries
npm install

# run node server
nodemon
```

The application is visible at port 8081 - [http://localhost:8081](http://localhost:8081)

To test if API works you can use [httpie](https://httpie.org/docs#installation) or [Postman](https://www.postman.com/).

```bash
# httpie way of testing the route
http GET http://localhost:8081/api/carplates

# response 
{
    "carplates": [
    {
      "_id": "5ef798318fb9f822cd48ac4c",
      "plate": "ABC500",
      "name": "wade",
      "createdAt": "2020-06-27T19:04:18.006Z",
      "updatedAt": "2020-06-27T19:04:18.006Z",
      "__v": 0
    },
    ...
    "page": 1,
    "total": 16,
    "items_per_page": 5
}
```

### Frontend instructions

```bash
# go into the angular app folder:
cd ../angular-app
```

In order for angular to work in your environment you need to download Angular CLI.
More about [Angular](https://angular.io/guide/setup-local) installation.

```bash
# With the following command the angular-cli will be installed globally in your machine:
npm install -g @angular/cli

# install required modules/libraries:
npm install

# run the angular app:
npm start
# or
ng serve
```
The application is visible at port 4200 - [http://localhost:4200](http://localhost:4200)

### API Endpoints

GET - /api/carplates - paginated(10 items by default) carplates list.

GET - paginated carplates list with filtering and search options:
*parameters are all optional*
- page: current page number,
- items_per_page: amount of carplates to retrieve per page. 10 by default,
- sortby: sort by default by name or by plate,
- orderby: descending or ascending order,
- filter: keyword to filter by,
- filteroption: filter by default by name or by plate.

etc.: /api/carplates?page=1&items_per_page=4&filteroption=plate&filter=abc

PUT - update single carplate - /api/carplates/:carplate_id
- parameters optional: name, plate(*unique*).

POST - store new carplate - /api/carplates
- parameters required: name, plate(*unique*).

DELETE - remove carplate from DB - /api/carplates/:carplate_id
- parameters required: carplate_id.

GET - get single carplate - /api/carplates/:carplate_id
- parameters required: carplate_id.

### MongoDB setup for [ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

Make sure you are executing it all in root directory
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
mkdir mongodb-data

echo 'mongod --bind_ip=$IP --dbpath=mongodb-data --nojournal --rest "$@"' > mongod
// if you get error about equal sign use the line below
echo 'mongod --dbpath mongodb-data --nojournal "$@"' > mongod

chmod a+x mongod
```
In order to use mongoDB during the development, need to keep it running in the background and only from directory where it installed:
```bash
./mongod
```