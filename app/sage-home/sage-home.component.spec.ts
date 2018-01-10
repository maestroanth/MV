import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SageHomeComponent } from './sage-home.component';

describe('SageHomeComponent', () => {
  let component: SageHomeComponent;
  let fixture: ComponentFixture<SageHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SageHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
