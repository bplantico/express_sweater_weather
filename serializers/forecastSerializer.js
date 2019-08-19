class forecastSerializer {
  constructor(location, rawForecast) {
    const forecast = JSON.parse(rawForecast)
    this.location = location;
    this.currently = forecast["currently"];
    this.hourly = forecast["hourly"]["data"].slice(0, 8);
    this.daily = forecast["daily"]["data"].slice(0, 7);
    this.alerts = forecast["alerts"];
  }
}

module.exports = forecastSerializer;
