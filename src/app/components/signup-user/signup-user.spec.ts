import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupUser } from './signup-user';

describe('SignupUser', () => {
  let component: SignupUser;
  let fixture: ComponentFixture<SignupUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
