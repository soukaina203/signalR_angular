import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNoteComponent } from './list-note.component';

describe('ListNoteComponent', () => {
  let component: ListNoteComponent;
  let fixture: ComponentFixture<ListNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListNoteComponent]
    });
    fixture = TestBed.createComponent(ListNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
