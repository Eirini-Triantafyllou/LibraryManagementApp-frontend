import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookLibrarian } from './create-book-librarian';

describe('CreateBookLibrarian', () => {
  let component: CreateBookLibrarian;
  let fixture: ComponentFixture<CreateBookLibrarian>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBookLibrarian]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBookLibrarian);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
