import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { interval } from 'rxjs';
import { HomepageImages } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-carousel',
  templateUrl: './news-carousel.component.html',
  styleUrls: ['./news-carousel.component.scss']
})
export class NewsCarouselComponent implements OnInit {
  @Input() newsImages: HomepageImages[];
  apiNewsImageURL = environment.apiNewsImageURL;
  image: string;
  index: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.newsImages) {
      this.newsImage();
    }
  }

  newsImage() {
    this.image = this.apiNewsImageURL + '/' + this.newsImages[this.index].image;
    interval(2500).subscribe(() => {
      this.index++;
      if(this.index > 2){
        this.index = 0;
      }
      this.image = this.apiNewsImageURL + '/' + this.newsImages[this.index].image;
    });
  }

}
