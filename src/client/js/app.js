const resultWeather = document.querySelector('#resultWeather');
const formWeather = document.querySelector('#formWeather');


const result = document.querySelector('#result');
const paginacionDiv = document.querySelector('#paginacion');

const recordsPerPage = 5;
let totalPages;
let iterador;
let actualPage = 1;

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
  //console.log(city);
  if (city === '' || firstDay === '' || lastDay === '' || search === '') {
    //Error
    showAlert('Fill out all the fields');

    return;
  }
  //Consult API
  searchImage();
  geoNamesAPI(city);

}

// GeonameAPI call //
export function geoNamesAPI(city) {
  const baseURLGeonames = 'http://api.geonames.org/searchJSON?q=';
  const appKeyGeonames = `joanna`;
  const compleUrlGeo = baseURLGeonames + city + '&maxRows=10&username=' + appKeyGeonames
  console.log(compleUrlGeo);

  fetch(compleUrlGeo)
    .then(response => response.json())
    .then(data => {
      console.log(data, "geonames")
      ConsultApiWeather(data)
    })
}

// WeatherbitAPI call //
export function ConsultApiWeather(data) {
  const latitude = data.geonames[0].lat;
  const longitude = data.geonames[0].lng;
  const weatherKey = 'b55790535efc444b9adc2f8c067f4aa6';
  const weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?`;

  const compleUrlWe = weatherUrl + 'lon=' + longitude + '&key=' + weatherKey + '&lat=' + latitude

  console.log(compleUrlWe);

  fetch(compleUrlWe)
    .then(response => response.json())
    .then(resultWeather => {
      console.log(resultWeather, "apiweather");

      showWeather(resultWeather);
    })

}

export function showWeather(data) {

  const weather = data.data

  console.log(data, weather);

  while (resultWeather.firstChild) {
    resultWeather.removeChild(resultWeather.firstChild);
  }

  weather.forEach(pronostico => {
    const { datetime, temp, max_temp, min_temp } = pronostico;

    resultWeather.innerHTML += `
    <div class="h-40 p-2 bg-gray-200 border-2 rounded-md "
    <div class"">
    <p class="">City: ${data.city_name}</p>
    <p class="">Country: ${data.country_code}</p>
    <p class="text-lg text-white">Date: ${datetime}</p>
    <p class="">Temperature: ${temp}</p>
    <p class="">Max Temperature: ${ max_temp}</p>
    <p class="">Min Temperature: ${min_temp}</p>
    <div/>
    <div/>
    `
  })

}


// PixaBay call //
export async function searchImage() {

  const search = document.querySelector('#description').value;

  const key = '18634593-15578008f57a9c24ca1d7ca87';
  const PixaBayUrl = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${recordsPerPage}$page=${actualPage}`;

  console.log(PixaBayUrl);

  fetch(PixaBayUrl)
    .then(response => response.json())
    .then(result => {
      totalPages = calculatePages(result.totalHits);
      showImagenes(result.hits);
    })
}

// Generator that records the number of items based on the pages
export function* createNewPages(total) {
  //console.log(total);
  for (let i = 1; i <= total; i++) {
    yield i;
  }
}

export function calculatePages(total) {
  return parseInt(Math.ceil(total / recordsPerPage));
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
     <div class=" w-64 mt-12 mb-4">
     <div class="bg-white mx-8">
     <img class="w-full h-40 object-center" src="${previewURL}">
     <div class="p-4">

     <p class="imagenfont text-sm"> ${likes} <span> Likes </span> </p>
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
  // Clean previous result
  while (paginacionDiv.firstChild) {
    paginacionDiv.removeChild(paginacionDiv.firstChild)
  }
  // Generate new HTML
  print();
}

export function print() {
  iterador = createNewPages(totalPages);

  while (true) {
    const { value, done } = iterador.next();
    if (done) return;

    //caso contrario, generar un boton por cada elemento en el generador
    const boton = document.createElement('a');
    boton.href = '#';
    boton.dataset.pagina = value;
    boton.textContent = value;
    boton.classList.add('Next', 'bg-teal-800', 'text-white', 'text-xs', 'px-4', 'py-1', 'mr-2', 'mb-10', 'rounded');

    boton.onclick = () => {
      actualPage = value;

      searchImage();
    }

    paginacionDiv.appendChild(boton);
  }
}





