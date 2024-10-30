const apiKey = '753bd0bd-4565-47d0-9873-d6b3dbef2428';
const stationId = 'Jenins';

// Proxy URL
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

// Ecowitt API endpoint with proxy URL added
const apiUrl = `${proxyUrl}https://api.ecowitt.net/api/v3/device/${stationId}/data?api_key=${apiKey}&format=json`;

// Function to fetch and update data
async function fetchWeatherData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    // Assuming data structure includes temperature and humidity
    const temperature = data?.temperature || 'N/A';
    const humidity = data?.humidity || 'N/A';
    
    // Update DOM
    document.getElementById('weather-data').innerHTML = `
      <p>Temperature: ${temperature} °C</p>
      <p>Humidity: ${humidity} %</p>
    `;
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('weather-data').innerHTML = `<p>Error fetching data</p>`;
  }
}

// Fetch data every 10 seconds
setInterval(fetchWeatherData, 10000);

// Initial fetch
fetchWeatherData();
