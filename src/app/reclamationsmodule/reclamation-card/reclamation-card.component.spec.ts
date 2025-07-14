import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationCardComponent } from './reclamation-card.component';

describe('ReclamationCardComponent', () => {
  let component: ReclamationCardComponent;
  let fixture: ComponentFixture<ReclamationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReclamationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
