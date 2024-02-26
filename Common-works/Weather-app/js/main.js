const API_KEY = '4d0acb5c587ea09e45d027229439b325';

const form = document.querySelector('#form');
const input = document.querySelector('.form__input');

form.onsubmit = submitHandler;

async function submitHandler(e) {
	e.preventDefault();

	if (!input.value.trim()) {
		console.log('Enter City name');
		return;
	}

    const cityName = input.value.trim();
    input.value = ''

	const cityInfo = await getGeo(cityName);
    console.log('cityInfo', cityInfo);

    if (!cityInfo.length) return;

	const weatherInfo = await getWeather(
		cityInfo[0]['lat'],
		cityInfo[0]['lon']
	);

    console.log(weatherInfo.name);
	console.log(weatherInfo.weather[0]['main']);

	const weatherData = {
		name: weatherInfo.name,
		temp: weatherInfo.main.temp,
		humidity: weatherInfo.main.humidity,
		speed: weatherInfo.wind.speed,
		main: weatherInfo.weather[0]['main'],
	};

	renderWeatherData(weatherData);
}

async function getGeo(name) {
	const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;
	const response = await fetch(geoUrl);
	const data = await response.json();
	return data;
}

async function getWeather(lat, lon) {
	const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
	const response = await fetch(weatherUrl);
	const data = await response.json();
	return data;
}

function renderWeatherData(data) {
	// Отображаем блоки с ифнормацией
	document.querySelector('.weather__info').classList.remove('none');
	document.querySelector('.weather__details').classList.remove('none');

	// Отображаем данные по погоде
	const temp = document.querySelector('.weather__temp');
	const city = document.querySelector('.weather__city');
	const humidity = document.querySelector('#humidity');
	const speed = document.querySelector('#speed');
	const img = document.querySelector('.weather__img');

	temp.innerText = Math.round(data.temp) + '°c';
	city.innerText = data.name;
	humidity.innerText = data.humidity + '%';
	speed.innerText = data.speed + ' km/h';

	const fileNames = {
		Clouds: 'clouds',
		Clear: 'clear',
		Rain: 'rain',
		Mist: 'mist',
		Drizzle: 'drizzle',
		Snow: 'snow',
	};

	if (fileNames[data.main]) {
		img.src = `./img/weather/${fileNames[data.main]}.png`;
	}
}
