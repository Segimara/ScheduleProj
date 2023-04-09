import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from "@fullcalendar/core";
import { MatDialog } from '@angular/material/dialog';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ClientService } from "src/app/Services/client.service";
import allLocales from '@fullcalendar/core/locales-all';
import { EventListVM } from "src/Models/ViewModels/EventListVM";
import { CreateEventDto } from "src/Models/RequestDtos/CreateEventDto";
//todo add pop ups for creating updation and view of events by click 
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-calendar-tabs',
  templateUrl: './calendar-tabs.component.html',
  styleUrls: ['./calendar-tabs.component.scss']
})
export class CalendarTabsComponent implements OnInit {
  calendarVisible = true;
  calendarOptions: CalendarOptions;

  constructor(private changeDetector: ChangeDetectorRef, 
    private webApiClient: ClientService ) {
    this.calendarOptions = {
        plugins: [
          interactionPlugin,
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
        ],
        headerToolbar: {
          left: 'title',
          center: '',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek prev,next today'
        },
        locales: allLocales,
        locale: 'uk',
        initialView: 'dayGridMonth',
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this)
    
      }; 
    this.calendarOptions.events = function(info, successCallback, failureCallback) {
      webApiClient.getList(info.start, info.end).subscribe((data: EventListVM) => {
        if (data.listDTOs == undefined || data.listDTOs == null) {
          failureCallback(new Error("No events found"));
        }
        else {
          successCallback(data.listDTOs);
        }
      });
    };
  }

  currentEvents: EventApi[] = [];

  ngOnInit() {

  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (title) {
      let obj = new CreateEventDto({
          title: title,
          description: "",
          priotity: 1,
          start: selectInfo.start ,
          end: selectInfo.end
        });
      this.webApiClient.create(obj).subscribe((data: EventListVM) => {
              calendarApi.addEvent(data);
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}

