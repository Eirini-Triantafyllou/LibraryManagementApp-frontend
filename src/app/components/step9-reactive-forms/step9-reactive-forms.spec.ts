import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step9ReactiveForms } from './step9-reactive-forms';

describe('Step9ReactiveForms', () => {
  let component: Step9ReactiveForms;
  let fixture: ComponentFixture<Step9ReactiveForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step9ReactiveForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step9ReactiveForms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
