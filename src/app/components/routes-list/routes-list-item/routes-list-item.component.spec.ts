import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesListItemComponent } from './routes-list-item.component';

describe('RoutesListItemComponent', () => {
  let component: RoutesListItemComponent;
  let fixture: ComponentFixture<RoutesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutesListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
