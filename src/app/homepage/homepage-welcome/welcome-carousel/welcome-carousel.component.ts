import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { interval } from 'rxjs';
import { HomepageImages } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome-carousel',
  templateUrl: './welcome-carousel.component.html',
  styleUrls: ['./welcome-carousel.component.scss']
})
export class WelcomeCarouselComponent implements OnInit, OnChanges {
  @Input() welcomeImages: HomepageImages[];
  apiWelcomeImageURL = environment.apiWelcomeImageURL;
  image: string;
  index: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.welcomeImages) {
      this.welcomeImage();
    }
  }

  welcomeImage() {
    this.image = this.apiWelcomeImageURL + '/' + this.welcomeImages[this.index].image;
    interval(4000).subscribe(() => {
      this.index++;
      if(this.index > 2){
        this.index = 0;
      }
      this.image = this.apiWelcomeImageURL + '/' + this.welcomeImages[this.index].image;
    });
  }
}
