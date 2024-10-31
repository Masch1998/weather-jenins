const apiKey = 'YOUR_ECOWITT_API_KEY';
const stationId = 'YOUR_STATION_ID';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = `https://api.ecowitt.net/api/v3/device/real_time?imei=&call_back=all&temp_unitid=1&pressure_unitid=3&wind_speed_unitid=6&rainfall_unitid=12&solar_irradiance_unitid=16&application_key=0D8C7C8B278C5E9469CD336E3B7F85CE&api_key=753bd0bd-4565-47d0-9873-d6b3dbef2428&mac=F0:08:D1:07:41:B8`;

// Function to fetch and display raw JSON data
async function fetchWeatherData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Display the entire JSON object as formatted text
    document.getElementById('json-display').textContent = JSON.stringify(data, null, 2);
    
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('json-display').textContent = 'Error fetching data';
  }
}

// Fetch data every 10 seconds
setInterval(fetchWeatherData, 10000);

// Initial fetch
fetchWeatherData();
