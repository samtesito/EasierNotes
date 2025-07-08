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
     return (note.name.toLowerCase().includes(this.searchTerm().toLowerCase()));
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
    if (selectedNote.id === this.selectedNote()?.id){
      this.unselectNote(); 
    }else{
      this.selectedNote.set(selectedNote);
    }
  }

  isSelected(currentNote: Note): boolean {
    let result = false;
    if (currentNote.id===this.selectedNote()?.id){ 
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
    this.notesService.delete(this.selectedNote()?.id!);
    this.unselectNote();
  } 
}



createNote(){

  let newNote: Note ={
    name: `Nota nueva`,
    html: '<p> Comienza a plasmar tus ideas aquí...</p>',
    categoryId: 1,
  }
  this.notesService.create(newNote)

}

changeNoteName(newName: string, note: Note) {
  if (newName && newName.trim() !== '') {
    note.name = newName;
    console.log("cambiando nombre de nota", note);
    this.notesService.update(note.id!, note);
  }
}

}
