// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { QuillModule} from 'ngx-quill';

// import Quill from 'quill';
// import BetterTable from 'quill-better-table';
// Quill.register({ 'modules/better-table': BetterTable }, true);

// // Registra el módulo de tablas en Quill
// Quill.register({
//   'modules/better-table': BetterTable
// }, true);

// @Component({
//   selector: 'app-note-editor',
//   standalone: true,
//   imports: [CommonModule, FormsModule, QuillModule],
//   template: `
//     <quill-editor
//       [(ngModel)]="content"
//       [modules]="modules"
//       theme="snow"
//       style="height: 300px">
//     </quill-editor>
//   `
// })
// export class NoteEditorComponent {
//   content =  ;
//   @Output() contentChange = new EventEmitter<string>();

//   modules = {
//     // La barra de herramientas
//     toolbar: {
//       container: [
//         ['bold', 'italic', 'underline'],
//         [{ header: [1, 2, 3, false] }],
//         ['link', 'image'],
//         [{ list: 'ordered' }, { list: 'bullet' }],
//         ['clean'],
//         ['table']      // nuestro botón “table”
//       ],
//       handlers: {
//         // Cuando el usuario hace clic en “table”:
//         'table': () => {
//           const range = this.quillEditor.getSelection();
//           if (range) {
//             // Inserta una tabla 3x3
//             this.quillEditor.getModule('better-table').insertTable(3, 3);
//           }
//         }
//       }
//     },
//     // Configuración del plugin de tablas
//     'better-table': {
//       operationMenu: {
//         items: {
//           row: { delete: true, insertAbove: true, insertBelow: true },
//           column: { delete: true, insertLeft: true, insertRight: true },
//           cell: { merge: true, split: true }
//         }
//       }
//     },
//     // Keybindings para navegar dentro de tablas
//     keyboard: {
//       bindings: BetterTable.keyboardBindings
//     }
//   };

//   // Referencia interna al editor para acceder al módulo
//   private quillEditor!: any;
//   onEditorCreated(editor: any) {
//     this.quillEditor = editor;
//     editor.on('text-change', () => {
//       this.contentChange.emit(editor.getData());
//     });
//   }
// }
