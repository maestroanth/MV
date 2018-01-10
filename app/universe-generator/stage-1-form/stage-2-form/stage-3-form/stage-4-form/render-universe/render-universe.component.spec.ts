import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderUniverseComponent } from './render-universe.component';

describe('RenderUniverseComponent', () => {
  let component: RenderUniverseComponent;
  let fixture: ComponentFixture<RenderUniverseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderUniverseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderUniverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
