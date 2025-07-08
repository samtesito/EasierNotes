import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/Note';
import { NoteNameComponent } from '../note-name/note-name.component';
import { NoteEditorComponent } from '../note-editor/note-editor.component';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [NoteNameComponent, NoteEditorComponent],
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDetailComponent {
  private noteService = inject(NotesService);
  private route = inject(ActivatedRoute);

  note!: Note;

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const noteId = idParam ? +idParam : NaN;
    this.noteService.getNoteById(noteId).subscribe(note => this.note = note);
  }

  changeNoteName(newName: string) {
    if (newName.trim()) {
      this.note.name = newName.trim();
      this.noteService.update(this.note);
    }
  }

  onSaveHtml(newContent: string) {
    this.note.html = newContent;
    this.noteService.update(this.note);
  }
}
