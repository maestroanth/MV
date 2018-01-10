import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage4FormComponent } from './stage-4-form.component';

describe('Stage4FormComponent', () => {
  let component: Stage4FormComponent;
  let fixture: ComponentFixture<Stage4FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage4FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage4FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
