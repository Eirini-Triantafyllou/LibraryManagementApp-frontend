import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookHandleLibrarian } from './book-handle-librarian';

describe('BookHandleLibrarian', () => {
  let component: BookHandleLibrarian;
  let fixture: ComponentFixture<BookHandleLibrarian>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookHandleLibrarian]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookHandleLibrarian);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
