import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderSearch } from './reader-search';

describe('ReaderSearch', () => {
  let component: ReaderSearch;
  let fixture: ComponentFixture<ReaderSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReaderSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReaderSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
