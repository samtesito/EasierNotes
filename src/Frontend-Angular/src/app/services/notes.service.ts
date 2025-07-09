import { inject, Injectable } from '@angular/core';
import { Note } from '../models/Note';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CategoriesService } from './categories.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  categoriesService = inject(CategoriesService);
  private http = inject(HttpClient);

  private URLbase = "http://localhost:5219/api/notes";
  private router = inject(Router);



  public create() {
    this.http.post<Note>(`${this.URLbase}/create`, {}).subscribe((response) => {
      const currentNotes = this.categoriesService.Categories();
      this.categoriesService.Categories.set(currentNotes.map(category =>{
        if(category.id === response.categoryId){
          return {
            ...category,
            notes: [...category.notes, response]
          }
        }
        return category;
      }));
      this.router.navigate(['/note', response.id]);
    });
  }

  public update(note:Note){
    return this.http.put(`${this.URLbase}/update`, note).subscribe(() => {
      this.categoriesService.Categories.set(this.categoriesService.Categories().map(category =>{
        if(category.id === note.categoryId){
          return {
            ...category,
            notes: category.notes.map(n => n.id === note.id ? note : n)
          }
        }
        return category;
      }));
  });
}

  public delete(note: Note){
    return this.http.delete(`${this.URLbase}/delete/${note.id}`).subscribe(() => {
      this.categoriesService.Categories.set(this.categoriesService.Categories().map(category =>{
        if(category.id === note.categoryId){
          return {
            ...category,
            notes: category.notes.filter(n => n.id !== note.id)
          }
        }
        return category;
      }));
  });}

  public getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.URLbase}/${id}`);
  }

  
}

