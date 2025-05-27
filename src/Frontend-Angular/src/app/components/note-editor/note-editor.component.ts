import { Component, AfterViewInit } from '@angular/core';
import { QuillModule }   from 'ngx-quill';
import { FormsModule } from '@angular/forms';

import Quill from 'quill';
import QuillBetterTable from 'quill-better-table';

// Registra el módulo una sola vez
Quill.register('modules/better-table', QuillBetterTable);

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [QuillModule, FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css']
})
export class NoteEditorComponent implements AfterViewInit {
  content = '';
  private quillEditor!: Quill;

  modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        // Quill va a buscar estos cuatro handlers:
        addColumn: () => this.addColumn(),
        addRow:    () => this.addRow(),
        // “image” ya es nativo, no hace falta handler
      }
    },
    'better-table': {
      operationMenu: {
        items: {
          insertRowBelow:   true,
          insertColumnRight:true,
          deleteRow:        true,
          deleteColumn:     true,
          deleteTable:      true
        }
      }
    },
    keyboard: {
      bindings: QuillBetterTable.keyboardBindings
    }
  };

  ngAfterViewInit() {
    // nada aquí; Quill se inicializa vía (onEditorCreated)
  }

  onEditorCreated(editor: Quill) {
    this.quillEditor = editor;
  }

  private addColumn() {
    const tableModule = this.quillEditor.getModule('better-table') as any;
    if (typeof tableModule.insertColumnRight === 'function') {
      tableModule.insertColumnRight();
    } else {
      console.warn('insertColumnRight no disponible en este módulo.');
    }
  }

  private addRow() {
    const tableModule = this.quillEditor.getModule('better-table') as any;
    if (typeof tableModule.insertRowBelow === 'function') {
      tableModule.insertRowBelow();
    } else {
      console.warn('insertRowBelow no disponible en este módulo.');
    }
  }
}
