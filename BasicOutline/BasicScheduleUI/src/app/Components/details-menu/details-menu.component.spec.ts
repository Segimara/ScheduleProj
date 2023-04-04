import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMenuComponent } from './details-menu.component';

describe('DetailsMenuComponent', () => {
  let component: DetailsMenuComponent;
  let fixture: ComponentFixture<DetailsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
