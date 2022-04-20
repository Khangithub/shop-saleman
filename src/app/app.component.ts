import { Component } from '@angular/core';

type Element = {
  type: string;
  name: string;
  content: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  serverElements: Element[] = [
    { type: 'server', name: 'testServer', content: 'just a test' },
  ];
}
