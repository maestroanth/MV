import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniverseGeneratorComponent } from './universe-generator.component';

describe('UniverseGeneratorComponent', () => {
  let component: UniverseGeneratorComponent;
  let fixture: ComponentFixture<UniverseGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniverseGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniverseGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
