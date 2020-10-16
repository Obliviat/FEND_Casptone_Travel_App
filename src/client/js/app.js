//GeonamesAPI
const geonamesUrl = 'http://api.geonames.org/searchJSON?q=';
const conUrl = '&maxRows=10';
const username = 'joanna';

//WeatherBit.ioAPI
const weatherUrl = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const key = 'b55790535efc444b9adc2f8c067f4aa6';

//PixaBayAPI
const pixabayUrl = 'https://pixabay.com/api/?';
const pixkey = '18634593-15578008f57a9c24ca1d7ca87';
const url = '&image_type=photo&pretty=true&category=places';
// PixaBayAPI - Image search engie 
const result = document.querySelector('#result');
const form = document.querySelector('#form');
const paginacionDiv = document.querySelector('#paginacion');
const recordsPerPage = 40
let totalPages;
let iterador;

//Main function to do the api requests
export async function compilationFunction(e) {
  //Checking for location if is added
  const location = document.getElementById('city').value;
  if (!location) {
    return alert('You must add a city/country');
  }
  const dateLeaving = document.getElementById('leaving').value;
  const dateReturning = document.getElementById('returning').value;
  const img = document.getElementById('img');

  //Api call to get the coordinates of the place in geonames
  const coordinates = await getData(geonamesUrl + location + conUrl + '&username=' + username);
  const lat = coordinates.geonames[0].lat;
  const lng = coordinates.geonames[0].lng;

  //api call to get the weather in weatherbit API based on lng and lat we got from geonames api.
  const weather = await getData(weatherUrl + 'lon=' + lng + '&key=' + key + '&lat=' + lat);

  //api call to get the picture of place we searched in pixabay api.
  const picture = await getData(pixabayUrl + 'key=' + pixkey + '&q=' + location + url);
  document.querySelector('.resultpart').classList.remove('hide');

  //posting data in server
  return postData('/forecast',
    {
      minTemp: weather.data[0].min_temp,
      maxTemp: weather.data[0].max_temp,
      description: weather.data[0].weather.description,
      country: coordinates.geonames[0].countryName,
      cityName: coordinates.geonames[0].toponymName,
      picture: picture.hits[0].largeImageURL,
      dateLeaving: dateLeaving,
      dateReturning: dateReturning
    })

    //Getting data from server
    .then(
      function (response) {
        return getData('/save');
      }
    )


    //Updating Ui
    .then(
      function (update) {
        const weather = `Min Temperature: ${update.minTemp}C - Max temperature: ${update.maxTemp}C`;
        document.getElementById('weather').innerHTML = weather;
        document.getElementById('country').innerText = update.country;
        document.getElementById('place').innerHTML = update.cityName;
        document.getElementById('description').innerHTML = update.description;

        //Checking if the date leaving and returning inputs are filled
        if (!dateLeaving && !dateReturning) {
          document.getElementById('leavingdate').innerText = 'No date picked';
          document.getElementById('returningdate').innerText = 'No date picked';

        } else {
          document.getElementById('leavingdate').innerHTML = update.dateLeaving;
          document.getElementById('returningdate').innerHTML = update.dateReturning;
        }

        //checking if we have a photo of that city we are searching
        if (!update.picture) {
          img.src = "https://unsplash.com/photos/uE2T1tCFsn8";
        }
        img.setAttribute('src', `${update.picture}`);

      }
    );
}

// Record de sumit for the form
window.onload = () => {
  form.addEventListener('submit', validateForm);
}

export function validateForm(e) {
  e.preventDefault();

  const searchClassification = document.querySelector('#termino').value;
  if (searchClassification === '') {
    showAlert('Add search term');
    return;
  }
  searchImage(searchClassification);
}

export function showAlert(message) {

  const alertExists = document.querySelector('.bg-red-100');

  if (!alertExists) {
    const alert = document.createElement('p');
    alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');

    alert.innerHTML = `
      <strong class="font-bold">Error!<strong>
      <span class"erroralert sm:inline">${message}</span>
      `;

    form.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }

}

//Image search engie 
export async function searchImage(termino) {
  const key = "18634593-15578008f57a9c24ca1d7ca87";
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${recordsPerPage}`;
  //console.log(url)

  try {
    const respuesta = await fetch(url);
    const result = await respuesta.json();
    totalPages = calculatePages(result.totalHits);
    //console.log(totalPages)
    showImagenes(result.hits);
  } catch (error) {
    console.log(error);
  }
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

export function showImagenes(imagenes) {
  console.log(imagenes)
  while (result.firstChild) {
    result.removeChild(resultado.firstChild);
  }
  //Iterate over array of images and build HTML
  imagenes.forEach(imagen => {
    const { previewURL, likes, views, largeImageURL } = imagen;
    result.innerHTML += `
     <div class=" w-64 md:w-1/3 lg:w-1/4 p-6 mb-4">
     <div class="bg-white">
     <img class="w-full object-center" src="${previewURL}">
     <div class="p-4">

     <p class="imagenfont text-sm"> ${likes} <span> Likes </span> </p>
     <p class="imagenfont text-sm"> ${views} <span> Views </span> </p>

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

    paginacionDiv.appendChild(boton);
  }
}

//Helper functions to get data and post data from an api.
export const getData = async (url = '') => {
  const response = await fetch(url);
  if (response.status === 404) {
    alert('Error');
  }
  try {
    const data = response.json();
    return data;

  } catch (err) {
    alert(err);
  }
};

//Helper function to post the data in server
export const postData = async (url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;

  } catch (err) {
    console.log(err);
  }
};




