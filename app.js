/* 
User stories:
1. I can see the weather in my current location.
2. I can click on temperature unit to toggle between Celsius and Fahrenheit.
3. I can see a different icon depending on weather conditions.
*/

window.addEventListener('load', function() {
  if ('geolocation' in navigator) {
    // Return the user's longitude and latitude on page load using Geolocation API
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      // API request using longitude and latitude to fetch weather conditions using Open Weather Map API
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=f4158d17beae9f61d8bc9af34010d680`
      )
        .then(function(response) {
          if (response.ok) {
            return response.json();
          }
        })
        .then(function(data) {
          var city = data.name;
          var descrip = data.weather[0].description;
          var iconCode = data.weather[0].icon;
          var tempinK = data.main.temp;
          var tempinF = Math.round((tempinK - 273.15) * (9 / 5) + 32);
          var tempinC = Math.round(tempinK - 273.15);
          var tempunit = `F`;
          // Render data to the DOM
          document.querySelector('#city').innerHTML = `${city}`;
          document.querySelector('#temp').innerHTML = `${tempinF}°`;
          document.querySelector('#tempunit').innerHTML = `${tempunit}`;
          document.querySelector('#descrip').innerHTML = `${descrip}`;
          // Click functionality to toggle temperature unit
          document
            .getElementById('tempunit')
            .addEventListener('click', function() {
              if (tempunit === `F`) {
                tempunit = `C`;
                document.querySelector('#temp').innerHTML = `${tempinC}°`;
                document.querySelector('#tempunit').innerHTML = `${tempunit}`;
              } else if (tempunit === `C`) {
                tempunit = `F`;
                document.querySelector('#temp').innerHTML = `${tempinF}°`;
                document.querySelector('#tempunit').innerHTML = `${tempunit}`;
              }
            });
          // Set matching icon
          var icons = new Skycons();
          var list = {
            '01d': 'clear-day',
            '01n': 'clear-night',
            '02d': 'partly-cloudy-day',
            '02n': 'partly-cloudy-night',
            '03d': 'cloudy',
            '03n': 'cloudy',
            '03d': 'cloudy',
            '04d': 'cloudy',
            '04n': 'cloudy',
            '09d': 'rain',
            '09n': 'rain',
            '10d': 'rain',
            '10n': 'rain',
            '11d': 'rain',
            '11n': 'rain',
            '13d': 'snow',
            '13n': 'snow',
            '50d': 'fog',
            '50n': 'fog'
          };
          icons.set('icon1', list[iconCode]);
          icons.play();
        });
    });
  } else {
    // Geolocation IS NOT available
    alert('Geolocation is not supported by your browser');
  }
});
