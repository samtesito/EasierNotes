import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteNameComponent } from './note-name.component';

describe('NoteNameComponent', () => {
  let component: NoteNameComponent;
  let fixture: ComponentFixture<NoteNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
