import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridmoviesComponent } from './gridmovies.component';

describe('GridmoviesComponent', () => {
  let component: GridmoviesComponent;
  let fixture: ComponentFixture<GridmoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridmoviesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridmoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
