
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ClientService } from './Services/client.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BasicScheduleUI';
  @ViewChild('drawer') drawer!: MatDrawer;
  opened = false;

  constructor(private readonly client: ClientService) {

  }
  
  isLoggedIn(): boolean {
    return this.client.isLoggedIn();
  }

  toggleDrawer() {
    console.log(this.drawer.toggle);
    this.drawer.toggle();
  }
}
