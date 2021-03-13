# Surf Rescue API - Version 1
This application allows the users to create, edit, delete and view places to surf. 
This API stores the information about a user and its respective places. It allows users to create, update, view and delete ideas of places to surf.

## Important Links
- [Surf Rescue Client Repo](https://github.com/thiagobardini/surf-rescue-client)
- [Surf Rescue API Repo](https://github.com/thiagobardini/surf-rescue-api)
- [Deployed Surf Rescue API](https://limitless-plateau-08641.herokuapp.com/)
- [Deployed Surf Rescue Client Application](https://thiagobardini.github.io/surf-rescue-client/)

## Planning Store
A few months ago, I was planning a surf trip with my friends, and I was uncertain of the best place to travel so I had this idea to create an application to help users find surf locations based on their preferences.

The idea of this project is to create a recommendation page for surfers who want to find the best spots to surf based on their preferences, and the recommendations should be ideal for their surfing skills, budget, and area they want to travel.
#### Version 1
The user can create/update/delete/view their favorite PLACES. The user can describe the location, if the location is better for right or lefty surfers, as well as input the cost, surf level, average waves size and more. 
### Unsolved Problems 
#### Version 2
User can create/update/delete/view their ACCOUNT, which will include: Name, surf level, average budget for surf trips, left/right stance on the surfboard, preference waves range and more.
#### Version 3
Next version users can create/update/delete/view REVIEWS places for each other. 
#### Version 4
Logic for suggesting Place based on a user's Account. The page will do recommendations matching Places skill to Account skill. 


## API End Points
Version 1

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| DELETE | `/sign-out`            | `users#signout`   |
| PATCH  | `/change-password`     | `users#changepw`  |
| GET    | `/places`              | `places#index`    |
| POST   | `/places`              | `places#create`   |
| GET    | `/places/:id`          | `places#show`     |
| DELETE | `/places/:id`          | `places#delete`   |
| PATCH  | `/places/:id`          | `places#update`   |

All data returned from API actions is formatted as JSON.

## API Routers
- User routes
- Places routes

## Technologies
- Mongo DB
- Mongoose
- Ajax
- JSON
- Node.JS
- Express
- Passport


#### The process:
This application uses authentication and allows users to create surf places inside the website. During the process of development, several tools were used to bring this API to live. Ajax, Mongoose, Express, Passport, and more. The application contains a robust back-end with validations for the user accounts. 

#### Problem Solving:
The goal for the application is be a tool for find the best surf place fits own their travellers budget and surf skills.



## ERD (Entity Relationship Diagram)
![Image of ORM](https://i.imgur.com/DKEqUAu.png)


