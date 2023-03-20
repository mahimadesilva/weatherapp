import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Constants } from '../config/constants';

@Injectable({ providedIn: 'root' })
export class CitiesService {
  public cities: any[] = [];
  public cityColors = ['#378de7', '#6149cb', '#60b681', '#de934e', '#9c3939'];
  private citiesExpireTimeLimit = 300000;

  constructor(private http: HttpClient, private constants: Constants) {
    if (this.citiesAreExpired()) {
      this.getCities();
    }
  }

  private citiesAreExpired() {
    if (
      sessionStorage.getItem('cities') &&
      sessionStorage.getItem('citiesExpireAt')
    ) {
      if (+sessionStorage.getItem('citiesExpireAt')! > Date.now()) {
        this.cities = JSON.parse(sessionStorage.getItem('cities')!);
        return false;
      }
    }
    return true;
  }
  private getCities() {
    this.http
      .get<{ cnt: number; list: any[] }>(this.constants.API_ENDPOINT)
      .pipe(map((data) => data.list))
      .subscribe(
        (data) => {
          this.cities = data;
          sessionStorage.setItem('cities', JSON.stringify(data));
          sessionStorage.setItem(
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
