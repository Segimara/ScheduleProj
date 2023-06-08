import { Component } from '@angular/core';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-details-menu',
  templateUrl: './details-menu.component.html',
  styleUrls: ['./details-menu.component.scss']
})
export class DetailsMenuComponent {

  constructor(private webApiClient: ClientService) {

  }
  fetchEvents() {
    this.webApiClient.getList(new Date(), new Date()).subscribe(data => {
        console.log(data);
      });
  }
}
