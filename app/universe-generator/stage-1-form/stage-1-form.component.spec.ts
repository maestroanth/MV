import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage1FormComponent } from './stage-1-form.component';

describe('Stage1FormComponent', () => {
  let component: Stage1FormComponent;
  let fixture: ComponentFixture<Stage1FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage1FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage1FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
