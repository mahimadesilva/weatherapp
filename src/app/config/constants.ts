import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import cityList from '../../assets/cities.json';

@Injectable({ providedIn: 'root' })
export class Constants {
  public readonly cityCodeList = cityList.List.map((city) => city.CityCode);
  public readonly API_ENDPOINT = `https://api.openweathermap.org/data/2.5/group?id=${this.cityCodeList.join(
    ','
  )}&units;=metric&appid=${environment.WEATHER_API_KEY}`;
}
