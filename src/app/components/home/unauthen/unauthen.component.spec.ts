import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenComponent } from './unauthen.component';

describe('UnauthenComponent', () => {
  let component: UnauthenComponent;
  let fixture: ComponentFixture<UnauthenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
