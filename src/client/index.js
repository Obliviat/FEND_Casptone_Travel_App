
import { compilationFunction } from "./js/app";
import { validateForm } from "./js/app";
import { showAlert } from './js/app';
import { searchImage } from './js/app';
import { showImagenes } from './js/app';
import { calculatePages } from './js/app';
import { createNewPages } from './js/app';
import { print } from './js/app';
import './styles/tailwind.min.scss'

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.continue').addEventListener('click', compilationFunction);
});
export {
    compilationFunction,
    validateForm,
    showAlert,
    searchImage,
    showImagenes,
    calculatePages,
    createNewPages,
    print
}


