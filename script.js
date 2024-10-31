const apiKey = 'YOUR_ECOWITT_API_KEY';
const stationId = 'YOUR_STATION_ID';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = `https://api.ecowitt.net/api/v3/device/real_time?imei=&call_back=all&temp_unitid=1&pressure_unitid=3&wind_speed_unitid=6&rainfall_unitid=12&solar_irradiance_unitid=16&application_key=0D8C7C8B278C5E9469CD336E3B7F85CE&api_key=753bd0bd-4565-47d0-9873-d6b3dbef2428&mac=F0:08:D1:07:41:B8`;

// Function to fetch and update data
async function fetchWeatherData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Outdoor data
    document.getElementById('outdoor-temp').textContent = data.data.outdoor.temperature.value;
    document.getElementById('feels-like').textContent = data.data.outdoor.feels_like.value;
    document.getElementById('dew-point').textContent = data.data.outdoor.dew_point.value;
    document.getElementById('outdoor-humidity').textContent = data.data.outdoor.humidity.value;

    // Indoor data
    document.getElementById('indoor-temp').textContent = data.data.indoor.temperature.value;
    document.getElementById('indoor-humidity').textContent = data.data.indoor.humidity.value;

    // Solar and UV data
    document.getElementById('solar-radiation').textContent = data.data.solar_and_uvi.solar.value;
    document.getElementById('uv-index').textContent = data.data.solar_and_uvi.uvi.value;

    // Rainfall data
    document.getElementById('rain-rate').textContent = data.data.rainfall.rain_rate.value;
    document.getElementById('daily-rain').textContent = data.data.rainfall.daily.value;

    // Wind data
    document.getElementById('wind-speed').textContent = data.data.wind.wind_speed.value;
    document.getElementById('wind-gust').textContent = data.data.wind.wind_gust.value;
    document.getElementById('wind-direction').textContent = data.data.wind.wind_direction.value;

    // Pressure data
    document.getElementById('pressure-rel').textContent = data.data.pressure.relative.value;
    document.getElementById('pressure-abs').textContent = data.data.pressure.absolute.value;
    
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('weather-data').innerHTML = `<p>Error fetching data</p>`;
  }
}

// Fetch data every 10 seconds
setInterval(fetchWeatherData, 10000);

// Initial fetch
fetchWeatherData();
