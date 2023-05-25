import { Component, Inject, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from 'src/app/Services/client.service';
import { EventImpl } from '@fullcalendar/core/internal';
import { EventDetailsVM } from 'src/Models/ViewModels/EventDetailsVM';
import { CommonModule } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})

export class CreateEventComponent implements OnInit {
  form!: FormGroup;
  startFormControl!: FormControl;
  endFormControl!: FormControl;

  @ViewChild('startPicker') startPicker!: MatDatepicker<Date>;
  @ViewChild('endPicker') endPicker!: MatDatepicker<Date>;


  constructor(public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: EventDetailsVM, eventImpl: EventImpl },
    private formBuilder: FormBuilder,
    private webApiClient: ClientService) {

    this.startFormControl = new FormControl('');
    this.endFormControl = new FormControl('');
    this.form = this.formBuilder.group({
      id: new FormControl(''),
      userId: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      priority: new FormControl(''),
      start: new FormControl(''),
      end: new FormControl('')
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
  }
}
