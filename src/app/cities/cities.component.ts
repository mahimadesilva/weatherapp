import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CitiesService } from './cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export class CitiesComponent implements OnInit {
  cities: any[] = [];
  constructor(private citiesService: CitiesService) {}

  ngOnInit(): void {
    this.getCities();
  }
  getCities() {
    this.citiesService.getCities().subscribe(
      (data) => {
        this.cities = data;
        console.log(this.cities)
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
