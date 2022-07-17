import { Component, Input, OnInit } from '@angular/core';
import { HomepageImages } from 'src/app/models';

@Component({
  selector: 'app-homepage-news',
  templateUrl: './homepage-news.component.html',
  styleUrls: ['./homepage-news.component.scss']
})
export class HomepageNewsComponent implements OnInit {
  @Input() newsImages: HomepageImages[];

  constructor() { }

  ngOnInit(): void {
  }

}
