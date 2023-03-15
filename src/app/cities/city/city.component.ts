import { Component, Input, OnInit } from '@angular/core';
import { CitiesService } from '../cities.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  @Input() city: any = {};
  @Input() index: number = 0;

  constructor(public citiesService: CitiesService) { }

  ngOnInit(): void {}
}
