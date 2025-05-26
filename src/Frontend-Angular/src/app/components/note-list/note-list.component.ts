import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/Note';

@Component({
  selector: 'app-note-list',
  imports: [],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteListComponent {
  notesService = inject(NotesService);  
  notes = this.notesService.MockNotes;
  selectedNote = signal<Note | null>(null);

  displayContentOverview(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const contentOverview = doc.body.textContent || '';

    return  contentOverview.length > 100 ? contentOverview.substring(0, 100) + '...' : contentOverview
    };
    
  }


