const button = document.getElementById("search-button");
const input = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");

async function getData(cityName) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=1b2150d46d73468794854457241905&q=${cityName}&aqi=yes`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

button.addEventListener("click", async () => {
    const value = input.value;
    try {
        const result = await getData(value);
        cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
        cityTime.innerText = result.location.localtime;
        cityTemp.innerText = `${result.current.temp_c} °C`;
    } catch (error) {
        console.error('Error fetching data:', error);
        cityName.innerText = 'Error fetching data';
        cityTime.innerText = '';
        cityTemp.innerText = '';
    }
});
