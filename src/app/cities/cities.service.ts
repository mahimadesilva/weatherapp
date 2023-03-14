import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import cityList from '../../assets/cities.json';

@Injectable({ providedIn: 'root' })
export class CitiesService {
  cities: any[] = [];
  cityCodeList = cityList.List.map((city) => city.CityCode);
  public cityColors = ['#378de7', '#6149cb', '#60b681', '#de934e', '#9c3939'];

  constructor(private http: HttpClient) {}

  public getCities() {
    const url = `http://api.openweathermap.org/data/2.5/group?id=${this.cityCodeList.join(
      ','
    )}&units;=metric&appid=e4e5a640da20f3a05005a29745eda68c`;

    return this.http
      .get<{ cnt: number; list: any[] }>(url)
      .pipe(map((data) => data.list));
  }
}
