import { Component, Input, OnInit } from '@angular/core';
import { HomepageImages } from 'src/app/models';

@Component({
  selector: 'app-homepage-welcome',
  templateUrl: './homepage-welcome.component.html',
  styleUrls: ['./homepage-welcome.component.scss']
})
export class HomepageWelcomeComponent implements OnInit {
  @Input() welcomeImages: HomepageImages[];

  constructor() { }

  ngOnInit(): void {
  }

}
