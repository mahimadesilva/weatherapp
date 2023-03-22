import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CitiesService } from '../cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CitiesComponent implements OnInit {
  cities: any[] = [];
  constructor(public citiesService: CitiesService) {}

  ngOnInit(): void {}

}
