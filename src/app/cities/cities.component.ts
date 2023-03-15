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
  constructor(public citiesService: CitiesService) {}

  ngOnInit(): void {}

}
