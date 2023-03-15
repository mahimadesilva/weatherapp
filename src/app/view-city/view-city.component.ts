import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitiesService } from '../cities/cities.service';

@Component({
  selector: 'app-view-city',
  templateUrl: './view-city.component.html',
  styleUrls: ['./view-city.component.css'],
})
export class ViewCityComponent implements OnInit {
  index = 0;
  constructor(
    private route: ActivatedRoute,
    public citiesService: CitiesService
  ) {}

  ngOnInit(): void {
    this.index = this.route.snapshot.params['index'];
  }
}
