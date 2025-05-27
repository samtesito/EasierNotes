import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/Note';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-list',
  imports: [],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteListComponent {
  notesService = inject(NotesService);  
  router = inject(Router);
  notes = this.notesService.MockNotes;
  selectedNote = signal<Note | null>(null);

  displayContentOverview(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const contentOverview = doc.body.textContent || '';

    return  contentOverview.length > 100 ? contentOverview.substring(0, 100) + '...' : contentOverview
  };

  unselectNote(){
    this.selectedNote.set(null);
  }

  selectNote(selectedNote: Note){
    if (selectedNote.Id === this.selectedNote()?.Id){
      this.unselectNote(); 
    }else{
      this.selectedNote.set(selectedNote);
      console.log("selectedNote", this.selectedNote());
    }
  }

  isSelected(currentNote: Note): boolean {
    let result = false;
    console.log("isNull", this.selectedNote()===null);
    if (currentNote.Id===this.selectedNote()?.Id){ 
      result =  true;
    } 
    console.log("isSelected", result, "currentNote.Id", currentNote.Id);
    return result;
  }

  openNote(noteId: number) {
    this.router.navigate(['/note', noteId]);
}

}

