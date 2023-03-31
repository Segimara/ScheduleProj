import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BasicScheduleUI';
  @ViewChild('drawer') drawer!: MatDrawer;
  opened = false;

  toggleDrawer() {
    console.log(this.drawer.toggle);
    this.drawer.toggle();
  }
}
