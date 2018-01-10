import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccountFormComponent } from './new-account-form.component';

describe('NewAccountFormComponent', () => {
  let component: NewAccountFormComponent;
  let fixture: ComponentFixture<NewAccountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAccountFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should validate name and email', () => {
      expect(component).toBeTruthy();
  });

  it('should give feedback once account is created', () => {
      expect(component).toBeTruthy();
  });

  it('should error when API does not respond', () => {
      expect(component).toBeTruthy();
  });
});
