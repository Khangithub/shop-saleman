import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allNewServer: boolean = false;

  constructor() {
    setTimeout(() => {
      this.allNewServer = true;
    }, 2500);
  }
  
  ngOnInit(): void {
  }

}
