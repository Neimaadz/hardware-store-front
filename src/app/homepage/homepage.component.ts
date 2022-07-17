import { Component, OnInit } from '@angular/core';
import { HomepageImages } from '../models';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  welcomeImages: HomepageImages[];
  newsImages: HomepageImages[];

  constructor(private homepageService: HomepageService) { }

  ngOnInit(): void {
    this.homepageService.getWelcomeImages().subscribe(welcomeImages => {
      this.welcomeImages = welcomeImages;
    })
    this.homepageService.getNewsImages().subscribe(newsImages => {
      this.newsImages = newsImages;
    })
  }

}
