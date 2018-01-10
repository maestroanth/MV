import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvpDuelComponent } from './pvp-duel.component';

describe('PvpDuelComponent', () => {
  let component: PvpDuelComponent;
  let fixture: ComponentFixture<PvpDuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvpDuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvpDuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
