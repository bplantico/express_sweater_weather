# EXPRESS SWEATER WEATHER

Express Sweater Weather is an API which provides the following endpoints to interact with:
+ [Create User Account](#create_user)
+ [User Sessions Login](#login)
+ [Forecast](#forecast)
+ [Favorite a Location](#favorite_a_location)
+ [List Favorite Locations](#list_favorites)
+ [Delete a Favorite Location](#delete_favorite)

# <a name="create_user"></a>Create User Account
`https://the-express-sweater-weather.herokuapp.com/api/v1/users`

The users endpoint receives a POST request along with a body containing an `email` address, `password`, and `passwordConfirmation` . If the email address has not already been used to create an account, and the password and passwordConfirmation match, then a unique API key is returned.

An example of a successful request:
```
POST https://the-express-sweater-weather.herokuapp.com/api/v1/users
Content-Type: application/json
Accept: application/json

{
  "email": "example@email.com",
  "password": "password"
  "passwordConfirmation": "password"
}
```
Successful response:
```
status: 201
body:

{
  "apiKey": "2dcf26f1-71af-4071-9060-24d49b6c86e4",
}
```
# <a name="login"></a>User Sessions Login
`https://the-express-sweater-weather.herokuapp.com/api/v1/sessions`

The sessions endpoint receives a POST request along with a body containing an `email` address and `password`. If the email address and password credentials are correct for a registered user, then the user's API key is returned.

An example of a successful request:
```
POST https://the-express-sweater-weather.herokuapp.com/api/v1/sessions
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
  "apiKey": "2dcf26f1-71af-4071-9060-24d49b6c86e4",
}
```
# <a name="forecast"></a>Forecast
`https://the-express-sweater-weather.herokuapp.com/api/v1/forecast?location=[example_location]`

The forecast endpoint receives a GET request with a `location` parameter and a body containing an `apiKey` (a valid API key is required), and returns a JSON formatted forecast with keys of `location`, `currently`, `hourly', 'daily`, and `alerts` (if applicable). A total of eight hour objects are returned in `hourly`, and seven day objects are returned in `daily`.

An example of a successful request:
```
GET https://the-express-sweater-weather.herokuapp.com/api/v1/forecast?location=denver,co
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
An example of a successful response:
```
{
    "data": {
        "location": "arvada,co",
        "currently": {
            "time": 1566185614,
            "summary": "Partly Cloudy",
            "icon": "partly-cloudy-night",
            "nearestStormDistance": 77,
            "nearestStormBearing": 83,
            "precipIntensity": 0,
            "precipProbability": 0,
            "temperature": 79.75,
            "apparentTemperature": 79.75,
            "dewPoint": 46.05,
            "humidity": 0.31,
            "pressure": 1011.43,
            "windSpeed": 4.43,
            "windGust": 4.43,
            "windBearing": 319,
            "cloudCover": 0.15,
            "uvIndex": 0,
            "visibility": 10,
            "ozone": 292
        },
        "hourly": [
            {
                "time": 1566183600,
                "summary": "Partly Cloudy",
                "icon": "partly-cloudy-night",
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 81.37,
                "apparentTemperature": 81.37,
                "dewPoint": 45.96,
                "humidity": 0.29,
                "pressure": 1010.9,
                "windSpeed": 4.57,
                "windGust": 4.57,
                "windBearing": 323,
                "cloudCover": 0.15,
                "uvIndex": 0,
                "visibility": 10,
                "ozone": 291.8
            },
            {
                   ... Seven more of the above ...
            }
        ],
        "daily": [
            {
                "time": 1566108000,
                "summary": "Partly cloudy throughout the day.",
                "icon": "partly-cloudy-day",
                "sunriseTime": 1566130601,
                "sunsetTime": 1566179677,
                "moonPhase": 0.61,
                "precipIntensity": 0.0001,
                "precipIntensityMax": 0.0017,
                "precipIntensityMaxTime": 1566194400,
                "precipProbability": 0.07,
                "precipType": "rain",
                "temperatureHigh": 91.27,
                "temperatureHighTime": 1566169200,
                "temperatureLow": 68.63,
                "temperatureLowTime": 1566216000,
                "apparentTemperatureHigh": 91.27,
                "apparentTemperatureHighTime": 1566169200,
                "apparentTemperatureLow": 68.63,
                "apparentTemperatureLowTime": 1566216000,
                "dewPoint": 45.61,
                "humidity": 0.41,
                "pressure": 1010.17,
                "windSpeed": 4.52,
                "windGust": 9.77,
                "windGustTime": 1566126000,
                "windBearing": 19,
                "cloudCover": 0.31,
                "uvIndex": 9,
                "uvIndexTime": 1566154800,
                "visibility": 9.885,
                "ozone": 295.2,
                "temperatureMin": 58.56,
                "temperatureMinTime": 1566133200,
                "temperatureMax": 91.27,
                "temperatureMaxTime": 1566169200,
                "apparentTemperatureMin": 58.56,
                "apparentTemperatureMinTime": 1566133200,
                "apparentTemperatureMax": 91.27,
                "apparentTemperatureMaxTime": 1566169200
            },
            {
                ... Six more of the above ...
            }
        ],
        "alerts": [
            {
                "title": "Air Quality Alert",
                "regions": [
                    "Adams",
                    "Arapahoe",
                    "Boulder",
                    "Broomfield",
                    "Denver",
                    "Douglas",
                    "Jefferson",
                    "Larimer",
                    "Weld"
                ],
                "severity": "advisory",
                "time": 1566166440,
                "expires": 1566252000,
                "description": "Description of any alerts will appear here.",
                "uri": "https://alerts.weather.gov/cap/wwacapget.php?x=CO125D0A8C3D58.AirQualityAlert.125D0A9B7A20CO.BOUAQABOU.1cf776118c3db3569458730525db3fe1"
            }
        ]
    }
}
```
# <a name="favorite_a_location"></a>Favorite a Location
`https://the-express-sweater-weather.herokuapp.com/api/v1/favorites`

The favorite location endpoint receives a POST containing a User's valid `apiKey` and a `location` in the body of the request and saves the location to the User's favorite locations.

An example of a successful request:
```
POST https://the-express-sweater-weather.herokuapp.com/api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
An example of a successful response:
```
status: 200
body:

{
  "data": "Denver, CO has been added to your favorites",
}
```
# <a name="list_favorites"></a>List Favorite Locations
Endpoint coming soon.
# <a name="delete_favorite"></a>Delete a Favorite Location
Endpoint coming soon.
