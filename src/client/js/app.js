// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
//Global Variables//
const formWeather = document.querySelector('#formWeather');
const resultEntry = document.querySelector('#resultWeather');
const resultWeather = document.querySelector('#resultWeather');
const result = document.querySelector('#result');

const baseURLGeonames = 'http://api.geonames.org/searchJSON?q=';
const appKeyGeonames = `joanna`;
const complementUrl = `&maxRows=1&username=`;

window.addEventListener('load', () => {
  formWeather.addEventListener('submit', validateForm);
})

//Alert of validation 
export function showAlert(message) {
  console.log(message)
  //Create alert
  const alertExists = document.querySelector('.bg-red-100');
  if (!alertExists) {
    const alert = document.createElement('div');
    alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    alert.innerHTML = `
      <strong class="font-bold">Error!<strong>
      <span class"block">${message}</span>
      `;
    formWeather.appendChild(alert);
    // Delete message
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }
}

//Here we will validate the information entered
export function validateForm(e) {
  e.preventDefault();
  console.log('Form validating...')
  // validation
  const city = document.querySelector('#city').value;
  const firstDay = document.querySelector('#leaving').value;
  const lastDay = document.querySelector('#returning').value;
  const search = document.querySelector('#description').value;
  console.log(city, "place");
  if (city === '' || firstDay === '' || lastDay === '' || search === '') {
    //Error
    showAlert('Fill out all the fields');
    return;
  }
  //Consult API
  development(e);
  geoNamesAPI(city);
  searchImage();
}

export function development(e) {
  e.preventDefault();
  const newCity = document.querySelector('#city').value;
  const search = document.querySelector('#description').value;
  searchInformation(baseURLGeonames, newCity, complementUrl, appKeyGeonames)
    .then(function (data) {
      postData('/addData', { date: d, city: data.geonames[0].toponymName, state: data.geonames[0].adminName1, country: data.geonames[0].countryName, content: search });
    })
    .then(function () {
      updateUI();
    })
}

//Get request
const searchInformation = async (baseURLGeonames, city, complementUrl, appKeyGeonames) => {
  const res = await fetch(baseURLGeonames + city + complementUrl + appKeyGeonames)
  try {
    // Transform into JSON
    const data = await res.json();
    console.log(data, "request");
    return data;
  } catch (e) {
    console.log("error", e);
  }
}

// POST function to server
const postData = async (url = '', data = {}) => {
  console.log(data, "Post");
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (e) {
    console.log('error', e);
  }
}

//update UI
const updateUI = async () => {
  const request = await fetch('/all')
  try {
    const allData = await request.json()
    console.log(allData.city, "allData");
    document.getElementById('date').innerHTML = "Date: " + allData.date;
    document.getElementById('state').innerHTML = "State: " + allData.state;
    document.getElementById('country').innerHTML = "Country: " + allData.country;
    document.getElementById('content').innerHTML = "Content: " + allData.content;
  } catch (e) {
    console.log("error", e);
  }
}

// GeonameAPI call //
export function geoNamesAPI(city) {
  const baseURLGeonames = 'http://api.geonames.org/searchJSON?q=';
  const appKeyGeonames = `joanna`;
  const compleUrlGeo = baseURLGeonames + city + '&maxRows=1&username=' + appKeyGeonames
  console.log(compleUrlGeo, "urlGeo");
  fetch(compleUrlGeo)
    .then(response => response.json())
    .then(data => {
      console.log(data, "geonames")
      consultApiWeather(data)
    })
}

// WeatherbitAPI call //
export function consultApiWeather(data) {
  const latitude = data.geonames[0].lat;
  const longitude = data.geonames[0].lng;
  const weatherKey = 'b55790535efc444b9adc2f8c067f4aa6';
  const weatherUrl = `https://api.weatherbit.io/v2.0/current?`;
  const compleUrlWe = weatherUrl + 'lat=' + latitude + '&lon=' + longitude + '&key=' + weatherKey
  // console.log(compleUrlWe);
  fetch(compleUrlWe)
    .then(response => response.json())
    .then(resultWeather => {
      console.log(resultWeather, "apiweather");
      showWeather(resultWeather);
    })
}

export function showWeather(data) {
  const weather = data.data
  // console.log(data, weather);
  while (resultWeather.firstChild) {
    resultWeather.removeChild(resultWeather.firstChild);
  }
  weather.forEach(pronostico => {
    const { city_name, sunrise, sunset, temp, weather, rh } = pronostico;
    const Fahrenheit = temp + 32.00;
    resultWeather.innerHTML += `
    <div class=" p-2 mx-auto bg-gray-200 border-2 rounded-md">
   
    <p class="pl-4 text-lg align-baseline">City: ${city_name}</p>
    <p class="pl-4 text-lg align-baseline">${weather.description}</p>

    <div class="grid gap-4 grid-cols-2 py-4">
    
    <div class="bg-white rounded-lg">
    <p class="p-3 text-3xl">Sunrise</p>
    <p class="text-lg align-baseline"><i class="fas fa-sun text-4xl p-4"></i>${sunrise} a.m</p>
    </div>

    <div class="bg-white rounded-lg">
    <p class="p-3 text-3xl">Sunset</p>
    <p class="text-lg align-baseline"><i class="far fa-moon text-4xl p-4"></i>${sunset} p.m</p>
    </div>

    <div class="bg-white rounded-lg">
    <p class="p-3 text-3xl">Humidity</p>
    <p class="text-lg align-baseline"><i class="fas fa-tint text-4xl p-4"></i>${rh}&#37</p>
    </div>

    <div class="bg-white rounded-lg">
    <p class="p-3 text-3xl">Feels Like</p>
    <p class="text-lg align-baseline"><i class="fas fa-temperature-high text-4xl p-4"></i>${Fahrenheit} &#8457</p>
    </div>

    </div>
    <div/>
    `
  })
}


export async function searchImage() {
  const search = document.querySelector('#description').value;
  const key = '18634593-15578008f57a9c24ca1d7ca87';
  const PixaBayUrl = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=4`;
  console.log(PixaBayUrl);

  fetch(PixaBayUrl)
    .then(response => response.json())
    .then(result => {
      showImagenes(result.hits);
    })
}

export function showImagenes(pictures) {
  console.log(pictures)

  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
  //Iterate over array of images and build HTML
  pictures.forEach(imagen => {
    const { previewURL, likes, tags, largeImageURL } = imagen;
    result.innerHTML += `
     <div class="bg-gray-100 w-80 my-4 rounded">
     <div class="mx-8">
     <img class="w-full text-center pt-8" src="${previewURL}">
     <div class="p-4">
     
     <p class="imagenfont text-sm"> ${tags} <span> Views </span> </p>

     <a class="imagenfont block w-full bg-blue-700 hover:bg-blue-600 text-white uppercase fontbold text-center text-xs rounded mt-5 p-1"
     href="${largeImageURL}" target="_blank" rel=" noopener noreferrer">
     View Imagen
     </a>
     <div/>
     <div/>
     <div/>
    `;
  });

}






