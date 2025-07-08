import { inject, Injectable, signal } from '@angular/core';
import { Note } from '../models/Note';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  
  private http = inject(HttpClient);
  private URLbase = "http://localhost:5219/api/notes";
  private router = inject(Router);

  Notes = signal<Note[]>([]);

  public obtainAll(): void {
    this.http.get<Note[]>(this.URLbase).subscribe((response) => 
      { 
        this.Notes.set(response);
        console.log("Notas obtenidas:", this.Notes());
       });
  }

  public create() {
    this.http.post<Note>(`${this.URLbase}/create`, {}).subscribe((response) => {
      const currentNotes = this.Notes();
      this.Notes.set([...currentNotes, response]);
      this.router.navigate(['/note', response.id]);
    });
  }

  public update(note:Note){
    return this.http.put(`${this.URLbase}/update`, note).subscribe((response) => {
      this.Notes.set(this.Notes().map(n => n.id === note.id ? note : n));
  });
}

  public delete(id: number){
    return this.http.delete(`${this.URLbase}/delete/${id}`).subscribe(() => {
      this.Notes.set(this.Notes().filter(n => n.id !== id));
  });}

  
}

