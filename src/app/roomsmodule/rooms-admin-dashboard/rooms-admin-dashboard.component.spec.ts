import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsAdminDashboardComponent } from './rooms-admin-dashboard.component';

describe('RoomsAdminDashboardComponent', () => {
  let component: RoomsAdminDashboardComponent;
  let fixture: ComponentFixture<RoomsAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsAdminDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomsAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
