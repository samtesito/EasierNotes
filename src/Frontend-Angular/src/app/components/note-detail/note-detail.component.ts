import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/Note';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NoteNameComponent } from "../note-name/note-name.component";

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [NoteNameComponent],
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteDetailComponent {
  private noteService = inject(NotesService);
  private sanitizer = inject(DomSanitizer);
  private route = inject(ActivatedRoute);

  note!: Note;
  sanitizedHtml!: SafeHtml;

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const noteId   = idParam ? +idParam : NaN;
    const allNotes = this.noteService.MockNotes;
    this.note = allNotes.find(n => n.Id === noteId) || allNotes[0];
    this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(this.note.Html);
  }

  changeNoteName(newName: string) {
    if (newName.trim()) {
      this.note.Name = newName.trim();
      //TODO: agregar httpp con el back
    }
  }
}
