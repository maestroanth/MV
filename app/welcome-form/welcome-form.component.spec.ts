import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeFormComponent } from './welcome-form.component';

describe('WelcomeFormComponent', () => {
  let component: WelcomeFormComponent;
  let fixture: ComponentFixture<WelcomeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to this page if URL is empty', () => {
      expect(component).toBeTruthy();
  });

  it('should redirect to this page if no login cookie exists', () => {
      expect(component).toBeTruthy();
  });

});
