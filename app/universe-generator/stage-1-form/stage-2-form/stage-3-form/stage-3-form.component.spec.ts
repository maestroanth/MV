import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage3FormComponent } from './stage-3-form.component';

describe('Stage3FormComponent', () => {
  let component: Stage3FormComponent;
  let fixture: ComponentFixture<Stage3FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage3FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage3FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
