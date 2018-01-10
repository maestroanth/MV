import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SageCreationComponent } from './sage-creation.component';

describe('SageCreationComponent', () => {
  let component: SageCreationComponent;
  let fixture: ComponentFixture<SageCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SageCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SageCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
