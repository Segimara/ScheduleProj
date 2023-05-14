import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarTabsComponent } from './Components/calendar-tabs/calendar-tabs.component';
import { DetailsMenuComponent } from './Components/details-menu/details-menu.component';
import { EventDetailsComponent } from './Components/event-details/event-details.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CalendarTabsComponent,
    DetailsMenuComponent,
    EventDetailsComponent,
  ],
  imports: [
    HttpClientModule,
    MarkdownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    OAuthModule.forRoot(),
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
