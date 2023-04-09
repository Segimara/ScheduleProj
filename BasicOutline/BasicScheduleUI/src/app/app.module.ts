import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CalendarTabsComponent } from './Components/calendar-tabs/calendar-tabs.component';
import { DetailsMenuComponent } from './Components/details-menu/details-menu.component';
import { MarkdownModule } from 'ngx-markdown';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventDetailsComponent } from './Components/event-details/event-details.component';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent,
    CalendarTabsComponent,
    DetailsMenuComponent,
    EventDetailsComponent,
  ],
  imports: [
    MarkdownModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    FullCalendarModule,
    OAuthModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
