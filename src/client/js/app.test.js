import { geoNamesAPI, consultApiWeather, searchImage } from './app.js'

test('geoNamesAPI shoud be a function', () => {
  expect(typeof geoNamesAPI).toBe('function');
});


test('weatherbitAPI shoud be a function', () => {
  expect(typeof consultApiWeather).toBe('function');
});

test('pixabayAPI shoud be a function', () => {
  expect(typeof searchImage).toBe('function');
});
