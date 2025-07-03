import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgenresComponent } from './listgenres.component';

describe('ListgenresComponent', () => {
  let component: ListgenresComponent;
  let fixture: ComponentFixture<ListgenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListgenresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListgenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
