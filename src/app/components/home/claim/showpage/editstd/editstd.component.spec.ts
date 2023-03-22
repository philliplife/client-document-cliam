import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstdComponent } from './editstd.component';

describe('EditstdComponent', () => {
  let component: EditstdComponent;
  let fixture: ComponentFixture<EditstdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditstdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditstdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
