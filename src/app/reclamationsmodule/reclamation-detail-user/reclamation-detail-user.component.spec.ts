import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationDetailUserComponent } from './reclamation-detail-user.component';

describe('ReclamationDetailUserComponent', () => {
  let component: ReclamationDetailUserComponent;
  let fixture: ComponentFixture<ReclamationDetailUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationDetailUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReclamationDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
