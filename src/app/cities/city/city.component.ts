import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CitiesService } from '../../cities.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnInit {
  @Input() city: any = {};
  @Input() index: number = 0;
  @ViewChild('colorBox', {static: true}) colorBox!: ElementRef;

  constructor(
    public citiesService: CitiesService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this.colorBox.nativeElement,
      'background-color',
      this.citiesService.cityColors[this.index % this.citiesService.cityColors.length]
    );
  }
}
