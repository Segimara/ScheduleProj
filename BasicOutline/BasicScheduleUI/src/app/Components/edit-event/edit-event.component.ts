import { Component, Inject, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from 'src/app/Services/client.service';
import { EventImpl } from '@fullcalendar/core/internal';
import { EventDetailsVM } from 'src/Models/ViewModels/EventDetailsVM';
import { CommonModule } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';
import { ViewEncapsulation } from '@angular/compiler';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})

export class EditEventComponent implements OnInit {
  form!: FormGroup;
  start: FormControl;
  end: FormControl;

  preview = { description: "" }
 // todo need add validation for form
  constructor(public dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: EventDetailsVM, eventImpl: EventImpl },
    private _ngZone: NgZone,
    private formBuilder: FormBuilder,
    private webApiClient: ClientService) {
    this.start = new FormControl('');
    this.end = new FormControl('');
    this.form = this.formBuilder.group({
      id: new FormControl(''),
      userId: new FormControl(''),
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
    this.form.setValue(this.data.event);
  }

  onSubmit() {
    const formData: EventDetailsVM = { ...this.form.value };
    if (this.isFormChanged(formData)) {
      this.sendRequest(formData);
    }
    this.dialogRef.close();
  }

  isFormChanged(formData: any): boolean {
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key] !== (this.data.event as any)[key]) {
        return true;
      }
    }
    return false;
  }

  sendRequest(formData: EventDetailsVM) {
    console.log(formData);
    let id = formData.id ?? '';
    this.webApiClient.update(id , formData).subscribe((result) => {
      this.dialogRef.close();
    });
  }

  deleteEvent() {
    if (confirm("Are you sure you want to delete this event?")) {
      this.data.eventImpl.remove();
      this.dialogRef.close();
    }
  }
  getTitle() {
    return "Edit event";
  }

  @ViewChild('autosize', { static: false }) autosize!: CdkTextareaAutosize;

  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
