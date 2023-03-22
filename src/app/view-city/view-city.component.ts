import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitiesService } from '../cities.service';

@Component({
  selector: 'app-view-city',
  templateUrl: './view-city.component.html',
  styleUrls: ['./view-city.component.css'],
})
export class ViewCityComponent implements OnInit {
  cityCode = 0;
  @ViewChild('boxTop', { static: true }) boxTop!: ElementRef;
  constructor(
    private route: ActivatedRoute,
    public citiesService: CitiesService
  ) {}

  ngOnInit(): void {
    this.cityCode = this.route.snapshot.params['cityCode'];
  }
}
