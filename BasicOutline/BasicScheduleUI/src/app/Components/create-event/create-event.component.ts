import { Component, Inject, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventImpl } from '@fullcalendar/core/internal';
import { EventDetailsVM } from 'src/Models/ViewModels/EventDetailsVM';
import { ClientService } from 'src/app/Services/client.service';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { CreateEventDto } from 'src/Models/RequestDtos/CreateEventDto';
import { CalendarApi } from '@fullcalendar/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  form!: FormGroup;
  start: FormControl;
  end: FormControl;

  preview = { description: "" }

 // todo need add validation for form
  constructor(public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { start: Date, end: Date, calendarApi: CalendarApi},
    private _ngZone: NgZone,
    private formBuilder: FormBuilder,
    private webApiClient: ClientService) {
    this.start = new FormControl('');
    this.end = new FormControl('');
    
    this.form = this.formBuilder.group({
      title: new FormControl(''),
      description: new FormControl(''),
      priority: new FormControl(''),
      start: this.start,
      end: this.end
    });
    this.form.controls['description'].valueChanges.pipe().subscribe((value: string) => {
      this.preview.description = value;
    });
  }

  ngOnInit(): void {
    this.form.patchValue({start: this.data.start, end: this.data.end});
  }

  onSubmit() {
    const formData: CreateEventDto = { ...this.form.value };
    //send reqyest to webApiClient and close if success
    this.webApiClient.create(formData).subscribe((result) => {
      this.data.calendarApi.addEvent(result);
      this.dialogRef.close();
    });
  }

  @ViewChild('autosize', { static: false }) autosize!: CdkTextareaAutosize;

  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
