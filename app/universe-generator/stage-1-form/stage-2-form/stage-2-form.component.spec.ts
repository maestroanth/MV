import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage2FormComponent } from './stage-2-form.component';

describe('Stage2FormComponent', () => {
  let component: Stage2FormComponent;
  let fixture: ComponentFixture<Stage2FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage2FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
