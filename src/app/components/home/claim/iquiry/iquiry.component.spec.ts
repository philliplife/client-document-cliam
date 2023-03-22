import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IquiryComponent } from './iquiry.component';

describe('IquiryComponent', () => {
  let component: IquiryComponent;
  let fixture: ComponentFixture<IquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
