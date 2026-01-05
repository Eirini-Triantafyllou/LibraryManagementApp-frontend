import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderHome } from './reader-home';

describe('ReaderHome', () => {
  let component: ReaderHome;
  let fixture: ComponentFixture<ReaderHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReaderHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReaderHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
