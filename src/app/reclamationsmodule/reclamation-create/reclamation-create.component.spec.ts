import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationCreateComponent } from './reclamation-create.component';

describe('ReclamationCreateComponent', () => {
  let component: ReclamationCreateComponent;
  let fixture: ComponentFixture<ReclamationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReclamationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
