import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CitiesService {
  cityColors = ['#378de7', '#6149cb', '#60b681', '#de934e', '#9c3939'];
  citiesExpireTimeLimit = 300000;
  cities: any = {};

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('cities')) {
      this.cities = JSON.parse(sessionStorage.getItem('cities')!);
    }
    this.getCities();
    setInterval(this.getCities.bind(this), this.citiesExpireTimeLimit + 30);
  }

  getCities() {
    for (let cityCode of environment.CITY_CODE_LIST) {
      if (sessionStorage.getItem('cities')) {
        var sessionStorageCities = JSON.parse(
          sessionStorage.getItem('cities')!
        );
      }
      if (
        !sessionStorageCities?.[cityCode]?.cityExpiresAt ||
        +sessionStorageCities?.[cityCode]?.cityExpiresAt < Date.now()
      ) {
        this.getCityByCityCode(cityCode);
      }
    }
    // Wait a second until http requests are done
    setTimeout(
      (() => {
        sessionStorage.setItem('cities', JSON.stringify(this.cities));
      }).bind(this),
      1000
    );
  }

  getCityByCityCode(citycode: string) {
    const url = environment.API_ENDPOINT.replace('{%ID%}', citycode).replace(
      '{%APIKEY%}',
      environment.WEATHER_API_KEY
    );
    this.http.get<any>(url).subscribe(
      (city) => {
        this.cities[citycode] = city;
        this.cities[citycode].cityExpiresAt =
          Date.now() + this.citiesExpireTimeLimit;
        if (citycode === '1248991') {
          this.cities[citycode].cityExpiresAt = Date.now() + 3600000;
        }
      },
      (err) => console.log(err)
    );
  }
}
