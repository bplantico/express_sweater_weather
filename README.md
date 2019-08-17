# EXPRESS SWEATER WEATHER

Express Sweater Weather is an API which provides the following endpoints to interact with:
+ [Create User Account](#create_user)
+ [User Login](#login)
+ [Forecast](#forecast)
+ [Favorite a Location](#favorite_a_location)
+ [List Favorite Locations](#list_favorites)
+ [Delete a Favorite Location](#delete_favorite)

# <a name="create_user"></a>Create User Account
'/api/v1/users?='

A create users request receives a POST along with an `email` address, `password`, and `passwordConfirmation`. If the email address has not already been used to create an account, and the password and passwordConfirmation match, then a unique API key is returned.

An example of a successful request:
```
POST /api/v1/users
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
  "password_confirmation": "password"
}
```
Successful response:
```
status: 201
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4",
}
```
# <a name="login"></a>User Login
# <a name="forecast"></a>Forecast
# <a name="favorite_a_location"></a>Favorite a Location
# <a name="list_favorites"></a>List Favorite Locations
# <a name="delete_favorite"></a>Delete a Favorite Location
