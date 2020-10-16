
import { validateForm, searchImage, createNewPages, showImagenes } from '../client/js/app.js'

test('geoNamesAPI shoud be a function', () => {
  expect(typeof validateForm).toBe('function');
});

test('weatherbitAPI shoud be a function', () => {
  expect(typeof searchImage).toBe('function');
});

test('pixabayAPI shoud be a function', () => {
  expect(typeof createNewPages).toBe('function');
});

test('updateUI shoud be a function', () => {
  expect(typeof showImagenes).toBe('function');
});