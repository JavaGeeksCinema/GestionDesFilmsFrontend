import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationHomeComponent } from './reclamation-home.component';

describe('ReclamationHomeComponent', () => {
  let component: ReclamationHomeComponent;
  let fixture: ComponentFixture<ReclamationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReclamationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
