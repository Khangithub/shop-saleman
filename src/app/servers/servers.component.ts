import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;
  createServerStatus: string = 'No server created';

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2500);
  }

  ngOnInit(): void {}

  onCreateServer() {
    this.createServerStatus = "server created"
  }
}
