# Task Activity Planner Web Application

[![Build Status](https://travis-ci.com/MAstrauskas/tap-web-app.svg?token=tnxttyznrk7mkbWTqrux&branch=master)](https://travis-ci.com/MAstrauskas/tap-web-app)
[![codecov](https://codecov.io/gh/MAstrauskas/tap-web-app/branch/master/graph/badge.svg?token=DI9LRJO5RB)](https://codecov.io/gh/MAstrauskas/tap-web-app)

## Description

This web application is a Task Activity Planner that helps the users to manage their daily tasks based on their mood. The users can add, edit, delete tasks or activities while also adding their current mood so that the system can suggest which tasks or activities should be completed first.

## Live Webapp

You can access the live version of this web app though this link: [click here](https://tap-webapp.herokuapp.com/)

## Prerequisites

1. Node - [Download Node.js](https://nodejs.org/en/download/)
2. Yarn - [Install Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
3. Auth0 - [Auth0](https://auth0.com)
   * Since the application uses Auth0 for authentication and authorization, you will need to create auth0 account to get your own AUTH0 API keys that you need to add in the `.env` file before running the application.
4. MongoDB - [MongoDB](https://mongodb.com) 
   * This application uses the cloud version of the MongoDB so you will need to create MongoDB account and pass the relevant information in the `.env` in order to run the app locally.


## File Structure

- `./client/` -> Client side of the application
- `./src/` -> Back-end/Server side of the application

## How to run locally

1. Install all the required dependencies by typing `yarn && yarn client-install` in the terminal from the root directory of the project
2. Type `yarn dev` in the terminal to run both client and server side concurrently
   1. To run only client side, type `yarn client` in the terminal
   2. To run only server side, type `yarn server` in the terminal
3. The client will run on `localhost:3000` and server on `localhost:9000`
   1. Go to `localhost:3000` to access the full web app in your browser
