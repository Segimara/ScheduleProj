import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EventImpl } from '@fullcalendar/core/internal';
import { EventDetailsVM } from 'src/Models/ViewModels/EventDetailsVM';
import { ClientService } from 'src/app/Services/client.service';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {

  eventDetails!: EventDetailsVM;

  constructor(public dialogRef: MatDialogRef<EventDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, eventImpl: EventImpl },
    private webApiClient: ClientService,
    public dialog: MatDialog) {
    this.webApiClient.get(this.data.id).subscribe(
      {
        next: (data: EventDetailsVM) => {
          this.eventDetails = data;
        },
        error: (error: any) => {
          console.error(error);
          this.dialogRef.close();
        }
      }
    );
  }

  openEditMenu() {
    this.dialog.open(CreateEventComponent, {
      data: {
        event: this.eventDetails,
        eventImpl: this.data.eventImpl
      },
      width: '90vmin',
      height: '90vmin',
    });
  }

  deleteEvent() {
    if (confirm("Are you sure you want to delete this event?")) {
      this.data.eventImpl.remove();
      this.dialogRef.close();
    }
  }
}
