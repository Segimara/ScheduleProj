import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTabsComponent } from './calendar-tabs.component';

describe('CalendarTabsComponent', () => {
  let component: CalendarTabsComponent;
  let fixture: ComponentFixture<CalendarTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
