const apiUrl = `https://api.ecowitt.net/api/v3/device/real_time?imei=&call_back=all&temp_unitid=1&pressure_unitid=3&wind_speed_unitid=6&rainfall_unitid=12&solar_irradiance_unitid=16&application_key=0D8C7C8B278C5E9469CD336E3B7F85CE&api_key=753bd0bd-4565-47d0-9873-d6b3dbef2428&mac=F0:08:D1:07:41:B8`;

function formatUnixTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleString();
}
// Function to fetch and display outdoor temperature
async function fetchTemperature() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Extract outdoor temperature value and unit
    const tempValue = data.data.outdoor.temperature.value;
    const tempUnit = data.data.outdoor.temperature.unit;
    const temp_feel = data.data.indoor.temperature.value;
    const timeData=formatUnixTimestamp(data.data.outdoor.temperature.time);

    const windSpeed = data.data.wind.wind_speed.value;
    const windUnit = data.data.wind.wind_speed.unit;
    const gustSpeed = data.data.wind.wind_gust.value;
    const windDir = data.data.wind.wind_direction.value;
    const windDirUnit = data.data.wind.wind_direction.unit;


    // Display the temperature as text
    document.getElementById('time').textContent = `Date: ${timeData}`;
    document.getElementById('temperature-display').textContent = `Outdoor Temperature: ${tempValue} ${tempUnit}`;
    document.getElementById('temperature-feellike').textContent = `Indoor Temperature: ${temp_feel} ${tempUnit}`;
    
    document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} ${windUnit}`;
    document.getElementById('gust-speed').textContent = `Gust Speed: ${gustSpeed} ${windUnit}`;
    document.getElementById('wind-direction').textContent = `Direction: ${windDir} ${windDirUnit}N`;
  
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('temperature-display').textContent = 'Error fetching temperature data';
  }
}
// Fetch temperature data every 10 seconds
setInterval(fetchTemperature, 10000);

// Initial fetch
fetchTemperature();
