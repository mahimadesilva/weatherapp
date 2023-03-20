import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitiesService } from '../cities/cities.service';

@Component({
  selector: 'app-view-city',
  templateUrl: './view-city.component.html',
  styleUrls: ['./view-city.component.css'],
})
export class ViewCityComponent implements OnInit {
  index = 0;
  @ViewChild('boxTop', { static: true }) boxTop!: ElementRef;
  constructor(
    private route: ActivatedRoute,
    public citiesService: CitiesService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.index = this.route.snapshot.params['index'];
    this.renderer.setStyle(
      this.boxTop.nativeElement,
      'background-color',
      this.citiesService.cityColors[this.index % 5]
    );
  }
}
