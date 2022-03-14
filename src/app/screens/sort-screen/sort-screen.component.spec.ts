import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortScreenComponent } from './sort-screen.component';

describe('SortScreenComponent', () => {
  let component: SortScreenComponent;
  let fixture: ComponentFixture<SortScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortScreenComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
