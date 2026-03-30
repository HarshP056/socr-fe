import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss'],
  standalone: false
})
export class PageLoaderComponent implements OnInit {
  @Input() content: string = 'Loading.....';
  constructor() {}

  ngOnInit() {}
}
