import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSageProfileComponent } from './view-sage-profile.component';

describe('ViewSageProfileComponent', () => {
  let component: ViewSageProfileComponent;
  let fixture: ComponentFixture<ViewSageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSageProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
