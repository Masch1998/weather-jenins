const apiUrl = `https://api.ecowitt.net/api/v3/device/real_time?imei=&call_back=all&temp_unitid=1&pressure_unitid=3&wind_speed_unitid=6&rainfall_unitid=12&solar_irradiance_unitid=16&application_key=0D8C7C8B278C5E9469CD336E3B7F85CE&api_key=753bd0bd-4565-47d0-9873-d6b3dbef2428&mac=F0:08:D1:07:41:B8`;

// Initialize empty arrays to store data points for charts
const temperatureData = [];
const humidityData = [];
const timeLabels = [];

// Chart instances for temperature and humidity
let temperatureChart, humidityChart;

// Fetch and update data function
async function fetchWeatherData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Parse temperature and humidity values
    const temp = parseFloat(data.data.outdoor.temperature.value);
    const humidity = parseFloat(data.data.outdoor.humidity.value);
    const timestamp = new Date(parseInt(data.time) * 1000).toLocaleTimeString();

    // Update data arrays
    temperatureData.push(temp);
    humidityData.push(humidity);
    timeLabels.push(timestamp);

    // Limit data arrays to the last 10 points for simplicity
    if (temperatureData.length > 10) {
      temperatureData.shift();
      humidityData.shift();
      timeLabels.shift();
    }

    // Update charts
    temperatureChart.update();
    humidityChart.update();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Initialize temperature and humidity charts
function initializeCharts() {
  const ctxTemp = document.getElementById('temperatureChart').getContext('2d');
  temperatureChart = new Chart(ctxTemp, {
    type: 'line',
    data: {
      labels: timeLabels,
      datasets: [{
        label: 'Outdoor Temperature (°C)',
        data: temperatureData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: 'Time' }},
        y: { title: { display: true, text: 'Temperature (°C)' }}
      }
    }
  });

  const ctxHumidity = document.getElementById('humidityChart').getContext('2d');
  humidityChart = new Chart(ctxHumidity, {
    type: 'line',
    data: {
      labels: timeLabels,
      datasets: [{
        label: 'Outdoor Humidity (%)',
        data: humidityData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: 'Time' }},
        y: { title: { display: true, text: 'Humidity (%)' }}
      }
    }
  });
}

// Fetch data and update charts every 10 seconds
setInterval(fetchWeatherData, 10000);
initializeCharts();
fetchWeatherData();
