import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListclaimComponent } from './listclaim.component';

describe('ListclaimComponent', () => {
  let component: ListclaimComponent;
  let fixture: ComponentFixture<ListclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListclaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
