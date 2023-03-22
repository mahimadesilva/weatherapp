import cityList from '../assets/cities.json';

export const environment = {
  production: false,
  WEATHER_API_KEY: 'e4e5a640da20f3a05005a29745eda68c',
  CITY_CODE_LIST : cityList.List.map((city) => city.CityCode).slice(0, 3),
  API_ENDPOINT : `https://api.openweathermap.org/data/2.5/weather?id={%ID%}&appid={%APIKEY%}`,
};
