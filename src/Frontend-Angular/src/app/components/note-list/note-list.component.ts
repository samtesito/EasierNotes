import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/Note';
import { Router } from '@angular/router';
import { ModalService } from '../../helpers/modal.service';
import { NoteNameComponent } from '../note-name/note-name.component';

@Component({
  selector: 'app-note-list',
  imports: [NoteNameComponent],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteListComponent implements OnInit {
  notesService = inject(NotesService);  
  modalService = inject(ModalService); 
  router = inject(Router);
  
  searchTerm = signal<string>('');

  ngOnInit() {
    this.notesService.obtainAll();
  }

  notes = computed(() => this.notesService.Notes().filter(note =>{
    if (this.searchTerm().length === 0) return true;
    
    return (note.Name.toLowerCase().includes(this.searchTerm().toLowerCase()));
  }));

  selectedNote = signal<Note | null>(null);
  

  displayContentOverview(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const contentOverview = doc.body.textContent || '';
    
    return  contentOverview.length > 100 ? contentOverview.substring(0, 100) + '...' : contentOverview
  };
  
  updateSearchTerm(value: string | null) {
    if (value === null) 
      this.searchTerm.set('');
     else 
      this.searchTerm.set(value);
  }

  private unselectNote(){
    this.selectedNote.set(null);
  }

  selectNote(selectedNote: Note){
    if (selectedNote.Id === this.selectedNote()?.Id){
      this.unselectNote(); 
    }else{
      this.selectedNote.set(selectedNote);
    }
  }

  isSelected(currentNote: Note): boolean {
    let result = false;
    if (currentNote.Id===this.selectedNote()?.Id){ 
      result =  true;
    } 
    return result;
  }

  openNote(noteId: number) {
    this.router.navigate(['/note', noteId]);
}

openDeleteModal(){
    console.log("deleteNote");
    if( this.selectedNote() === null) 
      return;
    this.modalService.open('confirmDeleteModal');
}

deleteNote() {
  if (this.selectedNote() !== null) {
    this.unselectNote();
    this.notesService.delete(this.selectedNote()?.Id!);
  } 
}



createNote(){

  let newNote: Note ={
    Id: null,
    Name: `Nota nueva`,
    Html: '<p> Comienza a plasmar tus ideas aquí...</p>',
    CategoryId: 1,
  }
  newNote = this.notesService.create(newNote)
  this.openNote(newNote.Id!);
}

changeNoteName(newName: string, note: Note) {
  if (newName && newName.trim() !== '') {
    note.Name = newName;
    this.notesService.update(note.Id!, note);
  }
}

}
