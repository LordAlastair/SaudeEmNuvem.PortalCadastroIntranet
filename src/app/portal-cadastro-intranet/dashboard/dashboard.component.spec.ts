import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: PortalDashboardComponent;
  let fixture: ComponentFixture<PortalDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortalDashboardComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
