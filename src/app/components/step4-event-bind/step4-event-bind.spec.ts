import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4EventBind } from './step4-event-bind';

describe('Step4EventBind', () => {
  let component: Step4EventBind;
  let fixture: ComponentFixture<Step4EventBind>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step4EventBind]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4EventBind);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
