import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',   
        redirectTo: 'notes',
        pathMatch: 'full'
    },
    {
        path: 'notes',
        loadComponent: () => import('./components/note-list/note-list.component').then(r => r.NoteListComponent)
    },
    {
        path: 'note/:id',
        loadComponent: () => import('./components/note-detail/note-detail.component').then(r => r.NoteDetailComponent)
    },

    //Fallback 
    {
        path:'**',
        redirectTo: 'notes',
    }
];
