import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLogin } from './login-user';

describe('Welcome', () => {
  let component: WelcomeLogin;
  let fixture: ComponentFixture<WelcomeLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
