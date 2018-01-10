import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSomvComponent } from './about-somv.component';

describe('AboutSomvComponent', () => {
  let component: AboutSomvComponent;
  let fixture: ComponentFixture<AboutSomvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSomvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSomvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
