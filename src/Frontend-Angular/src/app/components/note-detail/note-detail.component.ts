import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/Note';


@Component({
  selector: 'app-note-detail',
  imports: [],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteDetailComponent {
  noteService = inject(NotesService);
  notes = this.noteService.MockNotes;
  route = inject(ActivatedRoute);

  noteId!: number;
  note!: Note;

  constructor(){
    const idParam = this.route.snapshot.paramMap.get('id');
    this.noteId = idParam ? parseInt(idParam, 10) : 0;
    this.note = this.notes.find(note => note.Id === this.noteId) || this.notes[0];
  }

}
