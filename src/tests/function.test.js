
import { geoNamesAPI, ConsultApiWeather, searchImage, showImagenes } from '../client/js/app.js'

test('geoNamesAPI shoud be a function', () => {
  expect(typeof geoNamesAPI).toBe('function');
});

test('weatherbitAPI shoud be a function', () => {
  expect(typeof ConsultApiWeather).toBe('function');
});

test('pixabayAPI shoud be a function', () => {
  expect(typeof searchImage).toBe('function');
});

test('updateUI shoud be a function', () => {
  expect(typeof showImagenes).toBe('function');
});