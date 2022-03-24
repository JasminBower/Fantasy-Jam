# Fantasy Jam

# MVP

# API routes
* GET /
    * renders index.hbs
* GET /auth/signup
    * redirects to / if user logged in
    * renders add-signup.hbs
* POST /auth/signup
    * redirects to / if user logged in
    * body:
        * username
        * password
        * email
* POST /auth/login
    * redirects to / if user logged in  
    * body:
        * username
        * password
* GET /auth/logout
    * redirects to /
* GET /profile/profile
    * render porfile.hbs
    * redirects to getdrivers.hbs if user has a team
    * redirects to / if user logged out
* POST /profile/getdrivers
    * render profile/getdrivers 

# Backlog

# Data Structure
