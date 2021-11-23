# Kalendar

## What is Kalendar?
   > Kalendar is digital calendar. Authoried user can create event, edit event, invite other users, reply invitation and view schdules on Kalendar.

<img width="1438" alt="Screen Shot 2021-11-23 at 10 35 01 AM" src="https://user-images.githubusercontent.com/3848107/143056745-dd537f9a-712c-49c1-ab8d-e140646c4a24.png">


## Live Links


1. [Live Link](https://kalendar-aa.herokuapp.com) 

2. [Feature List](https://github.com/KristyCS/Kalendar/wiki/Feature-List)

## Technologies

  - React.js
  - Redux
  - JavaScript
  - Python
  - Flask
  - SQLALchemy
  - [OpenCageData](https://opencagedata.com)
  - [GoogleMap](https://developers.google.com/maps)
  - [AWS Storage](https://aws.amazon.com/?nc2=h_lg)


## How to run Kalendar on your local?
 
* PostgreSQL
* Pipenv with Python v3.94
* Node.js

1. `git clone` this repo
2. `cd` into the local repo
3. Run `pipenv install -r --dev dev-requirements.txt && pipenv install -r requirements.txt`
4. Create your own `.env` file based on the provided `.env.example`.
5. Create a user and database in your PostgreSQL that matches your `.env` configuration
6. In the first terminal, run `pipenv shell` to activate the Pipenv environment.
7. Run `flask db upgrade` and then `flask seed all` to apply migrations and seed data to your database.'
8. Run `flask run` to start flask server.
9. Open another terminal window and `cd` into the local repo, then `cd` into `react-app`
10. Run `npm install`
11. In your terminal running Pipenv shell, run `flask run`.
12. In your terminal in the `react-app`, run `npm start`.
13. Your app should open in your default browser.
14. If you are planning on developing, please make a fork and create pull requests as necessary.
