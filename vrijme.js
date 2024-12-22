// vrijeme 
async function fetchWeather() {
    const apiKey = 'tO315929c395d3143ac662dd73d19d33ea'; 
    const latitude = 43.8486;
    const longitude = 18.3564;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Greška: Status kod ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Greška:', error.message, error);
        document.getElementById('weather-data').innerHTML = '<p>Ne možemo trenutno dohvatiti podatke o vremenu.</p>';
    }
}
