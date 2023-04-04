import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { scheduler } from "dhtmlx-scheduler";
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-calendar-tabs',
  templateUrl: './calendar-tabs.component.html',
  styleUrls: ['./calendar-tabs.component.scss']
})
export class CalendarTabsComponent implements OnInit {
  @ViewChild("scheduler_here", { static: true }) schedulerContainer!: ElementRef;
  isRightMode = false;

  ngOnInit() {
    //scheduler.i18n.setLocale({
    //  date: {
    //    month_full: ["January", "February", "March", "April", "May", "June",
    //      "July", "August", "September", "October", "November", "December"],
    //    month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    //      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //    day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    //      "Friday", "Saturday"],
    //    day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    //  },
    //  labels: {
    //    dhx_cal_today_button: "Today",
    //    day_tab: "Day",
    //    week_tab: "Week",
    //    month_tab: "Month",
    //    new_event: "New event",
    //    icon_save: "Save",
    //    icon_cancel: "Cancel",
    //    icon_details: "Details",
    //    icon_edit: "Edit",
    //    icon_delete: "Delete",
    //    confirm_closing: "",// Your changes will be lost, are your sure?
    //    confirm_deleting: "Event will be deleted permanently, are you sure?",
    //    section_description: "Description",
    //    section_time: "Time period",
    //    full_day: "Full day",

    //    /*recurring events*/
    //    confirm_recurring: "Do you want to edit the whole set of repeated events?",
    //    section_recurring: "Repeat event",
    //    button_recurring: "Disabled",
    //    button_recurring_open: "Enabled",
    //    button_edit_series: "Edit series",
    //    button_edit_occurrence: "Edit occurrence",

    //    /*agenda view extension*/
    //    agenda_tab: "Agenda",
    //    date: "Date",
    //    description: "Description",

    //    /*year view extension*/
    //    year_tab: "Year",

    //    /* week agenda extension */
    //    week_agenda_tab: "Agenda",

    //    /*grid view extension*/
    //    grid_tab: "Grid",

    //    /* touch tooltip*/
    //    drag_to_create: "Drag to create",
    //    drag_to_move: "Drag to move",

    //    /* dhtmlx message default buttons */
    //    message_ok: "OK",
    //    message_cancel: "Cancel",

    //    /* wai aria labels for non-text controls */
    //    next: "Next",
    //    prev: "Previous",
    //    year: "Year",
    //    month: "Month",
    //    day: "Day",
    //    hour: "Hour",
    //    minute: "Minute",

    //    /* recurring event components */
    //    repeat_radio_day: "Daily",//name="repeat" value="day"
    //    repeat_radio_week: "Weekly",//name="repeat" value="week
    //    repeat_radio_month: "Monthly",
    //    repeat_radio_year: "Yearly",
    //    repeat_radio_day_type: "Every",
    //    repeat_text_day_count: "day",
    //    repeat_radio_day_type2: "Every workday",
    //    repeat_week: " Repeat every",
    //    repeat_text_week_count: "week next days:",
    //    repeat_radio_month_type: "Repeat",
    //    repeat_radio_month_start: "On",
    //    repeat_text_month_day: "day every",
    //    repeat_text_month_count: "month",
    //    repeat_text_month_count2_before: "every",
    //    repeat_text_month_count2_after: "month",
    //    repeat_year_label: "On",
    //    select_year_day2: "of",
    //    repeat_text_year_day: "day",
    //    select_year_month: "month",
    //    repeat_radio_end: "No end date",
    //    repeat_text_occurences_count: "occurrences",
    //    repeat_radio_end2: "After",
    //    repeat_radio_end3: "End by",
    //    month_for_recurring: ["January", "February", "March", "April", "May", "June",
    //      "July", "August", "September", "October", "November", "December"],
    //    day_for_recurring: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    //      "Friday", "Saturday"]
    //  }
    //});
    scheduler.i18n.setLocale("ua");
    scheduler.plugins({
      year_view: true
    });
    scheduler.plugins({
      active_links: true
    });
    scheduler.plugins({
      all_timed: true
    });
    // колизии (нелься создать несколько ивент в одни момент времени)
    //scheduler.plugins({
    //  collision: true
    //});
    //A code file for the radio, combo, checkbox controls of the lightbox.
    scheduler.plugins({
      editors: true
    });
    scheduler.plugins({
      expand: true
    });
    //Enables the keyboard navigation.
    scheduler.plugins({
      key_nav: true
    });
    //Provides a popup with an event details.
    scheduler.plugins({
      quick_info: true
    });
    //Provides support for recurring events.
    scheduler.plugins({
      recurring: true
    });
    //Provides support for serializing into ICal, XML, JSON formats.
    scheduler.plugins({
      serialize: true
    });
    //Enables tooltips for events.
    scheduler.plugins({
      tooltip: true
    });
    //    Saves the scheduler's state (date, event's id, view) in URL.
    //For example, 10_url_date_plugin.html#date=2014-08-01,mode=month or 10_url_date_plugin.html#event=15
    scheduler.plugins({
      url: true
    });
    scheduler.locale.labels.year_tab = "Year";
    scheduler.init(this.schedulerContainer.nativeElement, new Date(Date.now()),);

  }
  toggleToDayView() {
    scheduler.setCurrentView(new Date(Date.now()), "day");
  }
  toggleToWeekView() {
    scheduler.setCurrentView(new Date(Date.now()), "week");
  }
  toggleToMonthView() {
    scheduler.setCurrentView(new Date(Date.now()), "month");
  }
  toggleToYearView() {
    scheduler.setCurrentView(new Date(Date.now()), "year");
  }
  toggleLeftRighMode() {
    this.isRightMode = !this.isRightMode;
    scheduler.config.rtl = this.isRightMode;
    scheduler.updateView();
  }

}