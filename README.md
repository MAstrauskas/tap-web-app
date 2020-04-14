# Task Activity Planner Web Application

[![Build Status](https://travis-ci.com/MAstrauskas/tap-web-app.svg?token=tnxttyznrk7mkbWTqrux&branch=master)](https://travis-ci.com/MAstrauskas/tap-web-app)
[![codecov](https://codecov.io/gh/MAstrauskas/tap-web-app/branch/master/graph/badge.svg?token=DI9LRJO5RB)](https://codecov.io/gh/MAstrauskas/tap-web-app)

## Description

This web application is a Task Activity Planner that helps the users to manage their daily tasks based on their mood. The users can add, edit, delete tasks or activities while also adding their current mood so that the system can suggest which tasks or activities should be completed first.

## How to access the web app?

There are two ways how you can access the web application
- You can access the live deployed web app, or
- You can spin you own version of the web app locally

Steps are provided how to do both down below.

## Live Website

- You can access the application through this link -> [ma738-tap.herokuapp.com](https://ma738-tap.herokuapp.com)
- **NOTE:** To gain full access to the application, you must create an account first.

## Prerequisites

1. Node - [Download Node.js](https://nodejs.org/en/download/)
2. Yarn - [Install Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

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
