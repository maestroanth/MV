import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyEnergyComponent } from './buy-energy.component';

describe('BuyEnergyComponent', () => {
  let component: BuyEnergyComponent;
  let fixture: ComponentFixture<BuyEnergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyEnergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
