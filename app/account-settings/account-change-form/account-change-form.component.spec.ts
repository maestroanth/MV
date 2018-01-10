import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountChangeFormComponent } from './account-change-form.component';

describe('AccountChangeFormComponent', () => {
  let component: AccountChangeFormComponent;
  let fixture: ComponentFixture<AccountChangeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountChangeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountChangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
