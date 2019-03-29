import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobUserLoginComponent } from './job-user-login.component';

describe('JobUserLoginComponent', () => {
  let component: JobUserLoginComponent;
  let fixture: ComponentFixture<JobUserLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobUserLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
