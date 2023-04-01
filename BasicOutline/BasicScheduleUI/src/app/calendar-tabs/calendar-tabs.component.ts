import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { scheduler } from "dhtmlx-scheduler";
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-calendar-tabs',
  templateUrl: './calendar-tabs.component.html',
  styleUrls: ['./calendar-tabs.component.scss']
})
export class CalendarTabsComponent implements OnInit {
  @ViewChild("scheduler_here", {static: true}) schedulerContainer!: ElementRef;
  isRightMode = false;

  ngOnInit() {
      //scheduler.locale = "ua";
      scheduler.init(this.schedulerContainer.nativeElement, new Date(Date.now()),);
  }

  toggleLeftRighMode() {
      this.isRightMode = !this.isRightMode;
      scheduler.config.rtl = this.isRightMode;
      scheduler.updateView();
  }

}