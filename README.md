# EXPRESS SWEATER WEATHER

Express Sweater Weather is an API which provides the following endpoints to interact with:
+ [Create User Account](#create_user)
+ [User Login](#login)
+ [Forecast](#forecast)
+ [Favorite a Location](#favorite_a_location)
+ [List Favorite Locations](#list_favorites)
+ [Delete a Favorite Location](#delete_favorite)

# <a name="create_user"></a>Create User Account
`https://the-express-sweater-weather.herokuapp.com/api/v1/users`

The users endpoint receives a POST request along with a body containing an `email` address, `password`, and `passwordConfirmation` . If the email address has not already been used to create an account, and the password and passwordConfirmation match, then a unique API key is returned.

An example of a successful request:
```
POST /api/v1/users
Content-Type: application/json
Accept: application/json

{
  "email": "example@email.com",
  "password": "password"
  "password_confirmation": "password"
}
```
Successful response:
```
status: 201
body:

{
  "api_key": "2dcf26f1-71af-4071-9060-24d49b6c86e4",
}
```
# <a name="login"></a>Sessions Login
`https://the-express-sweater-weather.herokuapp.com/api/v1/sessions`

The sessions endpoint receives a POST request along with a body containing an `email` address and `password`. If the email address and password credentials are correct for a registered user, then the user's API key is returned.

An example of a successful request:
```
POST /api/v1/sessions
Content-Type: application/json
Accept: application/json

{
  "email": "example@email.com",
  "password": "password"
}
```
An example of a successful response:
```
status: 200
body:

{
  "api_key": "2dcf26f1-71af-4071-9060-24d49b6c86e4",
}
```
# <a name="forecast"></a>Forecast
# <a name="favorite_a_location"></a>Favorite a Location
# <a name="list_favorites"></a>List Favorite Locations
# <a name="delete_favorite"></a>Delete a Favorite Location
