import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import cityList from '../../assets/cities.json';

@Injectable({ providedIn: 'root' })
export class CitiesService {
  public cities: any[] = [];
  cityCodeList = cityList.List.map((city) => city.CityCode);
  public cityColors = ['#378de7', '#6149cb', '#60b681', '#de934e', '#9c3939'];
  citiesExpireTimeLimit = 300000;

  constructor(private http: HttpClient) {
    if (this.wasAppRefreshedAndCitiesNotExpired()) {
      const time = +localStorage.getItem('citiesExpireAt')! - Date.now() + 10;
      console.log(`app was refreshed. Will fetch again in ${time} ms`);
      setTimeout(() => {
        this.getCities.bind(this)();
        setInterval(this.getCities.bind(this), this.citiesExpireTimeLimit);
      }, time);
    } else {
      this.getCities();
      setInterval(this.getCities.bind(this), this.citiesExpireTimeLimit);
    }
  }

  private wasAppRefreshedAndCitiesNotExpired() {
    if (
      localStorage.getItem('cities') &&
      localStorage.getItem('citiesExpireAt')
    ) {
      if (+localStorage.getItem('citiesExpireAt')! > Date.now()) {
        this.cities = JSON.parse(localStorage.getItem('cities')!);
        return true;
      }
    }
    return false;
  }
  private getCities() {
    const url = `https://api.openweathermap.org/data/2.5/group?id=${this.cityCodeList.join(
      ','
    )}&units;=metric&appid=e4e5a640da20f3a05005a29745eda68c`;

    this.http
      .get<{ cnt: number; list: any[] }>(url)
      .pipe(map((data) => data.list))
      .subscribe(
        (data) => {
          console.log('cities was fetched');
          console.log(
            `Time since last fetch ${
              Date.now() -
              (+localStorage.getItem('citiesExpireAt')! -
                this.citiesExpireTimeLimit)
            } ms`
          );
          this.cities = data;
          localStorage.setItem('cities', JSON.stringify(data));
          localStorage.setItem(
            'citiesExpireAt',
            (Date.now() + this.citiesExpireTimeLimit).toString()
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
