import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitiesService } from '../cities.service';

@Component({
  selector: 'app-view-city',
  templateUrl: './view-city.component.html',
  styleUrls: ['./view-city.component.css'],
})
export class ViewCityComponent implements OnInit {
  cityCode = '';
  constructor(
    private route: ActivatedRoute,
    public citiesService: CitiesService
  ) {}

  ngOnInit(): void {
    this.cityCode = this.route.snapshot.params['cityCode'];
    this.citiesService.getCityByCityCode(this.cityCode);
    // Wait a second until http requests are done
    setTimeout(
      (() => {
        sessionStorage.setItem(
          'cities',
          JSON.stringify(this.citiesService.cities)
        );
      }).bind(this.citiesService),
      1000
    );
  }
}
