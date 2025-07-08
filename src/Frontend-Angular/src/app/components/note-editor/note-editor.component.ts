import {Component,ChangeDetectionStrategy,Input,Output,EventEmitter,ViewChild,ElementRef,AfterViewInit,signal} from '@angular/core';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteEditorComponent implements AfterViewInit {
  @Input() contentInput = '';              
  @Output() save = new EventEmitter<string>();

  @ViewChild('editor', { static: true })
  private editor!: ElementRef<HTMLDivElement>;

  @ViewChild('fileInput', { static: true })
  private fileInput!: ElementRef<HTMLInputElement>;

  @ViewChild('insertImageButton', { static: true })
  private insertImageButton!: ElementRef<HTMLButtonElement>;

  @ViewChild('insertRowButton', { static: true })
  private insertRowButton!: ElementRef<HTMLButtonElement>;

  @ViewChild('insertColumnButton', { static: true })
  private insertColumnButton!: ElementRef<HTMLButtonElement>;

  isEditorFocused = signal(false);


  ngAfterViewInit() {
    this.editor.nativeElement.innerHTML = this.contentInput;
    
    // Agregar listeners para el estado del editor
    this.editor.nativeElement.addEventListener('focus', () => {
      console.log("Editor enfocado");
      this.isEditorFocused.set(true);
    });
    
    this.editor.nativeElement.addEventListener('blur', (event) => { 
      // Verificar si el evento de blur fue causado por el clic en insertar imagen
      const relatedTarget = event.relatedTarget as HTMLElement;
      if (relatedTarget === this.insertImageButton.nativeElement || 
          relatedTarget === this.insertRowButton.nativeElement || 
          relatedTarget === this.insertColumnButton.nativeElement)  return;
      
      this.isEditorFocused.set(false);
    });
  }

  onSave() {
    const html = this.editor.nativeElement.innerHTML;
    this.save.emit(html);
  }

  onInsertImage() {
    console.log("Insertando imagen");
    // Resetea el input y lo abre
    this.fileInput.nativeElement.value = '';
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    // Obtiene sólo el primer archivo del input
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      this.insertImageAtCursor(url);
    };
    reader.readAsDataURL(file);

  }

  private insertImageAtCursor(url: string) {
    const img = document.createElement('img');
    img.src = url;
    img.style.width = '55%';
    img.style.height = 'auto';

    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;

    const range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(img);

    range.setStartAfter(img);
    range.collapse(true);

    //Posicionamos el cursor en la linea de abajo después de la imagen
    const br = document.createElement('br');
    range.insertNode(br);
    range.setStartAfter(br);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  onInsertRow() {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const table = this.getTableAtSelection();
    if (table) {
      this.insertRowInTable(table, sel);
    } else {
      this.insertNewTable(3, 3);
    }
  }

  onInsertColumn() {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const table = this.getTableAtSelection();
    if (table) {
      this.insertColumnInTable(table, sel);
    } else {
      this.insertNewTable(3, 3);
    }
  }

  private getTableAtSelection(): HTMLTableElement | null {
    const sel = window.getSelection()!;
    const container = sel.getRangeAt(0).startContainer as Node;
    return container.nodeType === 1
      ? (container as HTMLElement).closest('table')
      : (container.parentElement)?.closest('table') || null;
  }

  private insertNewTable(rows: number, cols: number) {
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.tableLayout = 'fixed';
    table.style.borderCollapse = 'collapse';

    const colWidth = (100 / cols) + '%';
    for (let r = 0; r < rows; r++) {
      const tr = table.insertRow();
      for (let c = 0; c < cols; c++) {
        const td = tr.insertCell();
        td.innerHTML = '<br>';
        td.style.border = '1px solid #ccc';
        td.style.padding = '0.5rem';
        td.style.width = colWidth;
      }
    }

    // insertar en cursor
    const sel = window.getSelection()!;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(table);

    // cursor en primera celda
    this.placeCursorInTableNode(table.rows[0].cells[0]);
  }

  private insertRowInTable(table: HTMLTableElement, sel: Selection) {
    // localiza fila actual
    const td = (sel.getRangeAt(0).startContainer as HTMLElement).closest('td');
    const currentRow = td?.parentElement as HTMLTableRowElement;
    if (!currentRow) return;

    // índice de fila y columnas
    const idx = currentRow.rowIndex;
    const colCount = table.rows[0].cells.length;
    const colWidth = (100 / colCount) + '%';

    const newRow = table.insertRow(idx + 1);
    for (let c = 0; c < colCount; c++) {
      const cell = newRow.insertCell();
      cell.innerHTML = '<br>';
      cell.style.border = '1px solid #ccc';
      cell.style.padding = '0.5rem';
      cell.style.width = colWidth;
    }
    this.placeCursorInTableNode(newRow.cells[0]);
  }

  private insertColumnInTable(table: HTMLTableElement, sel: Selection) {
    // localiza celda actual
    const td = (sel.getRangeAt(0).startContainer as HTMLElement).closest('td');
    const cellIndex = td?.cellIndex ?? table.rows[0].cells.length - 1;

    // nuevo conteo y ancho
    const newColCount = table.rows[0].cells.length + 1;
    const colWidth = (100 / newColCount) + '%';

    // para cada fila, inserta celda tras cellIndex
    for (const tr of Array.from(table.rows)) {
      const newCell = tr.insertCell(cellIndex + 1);
      newCell.innerHTML = '<br>';
      newCell.style.border = '1px solid #ccc';
      newCell.style.padding = '0.5rem';
      newCell.style.width = colWidth;
      // reajustar width de las antiguas
      Array.from(tr.cells).forEach(td => {
        td.style.width = colWidth;
      });
    }

    // cursor en la nueva celda
    const newTd = table.rows[
      (td?.parentElement as HTMLTableRowElement).rowIndex
    ].cells[cellIndex + 1];
    this.placeCursorInTableNode(newTd);
  }

  private placeCursorInTableNode(node: Node) {
    const sel = window.getSelection()!;
    const range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
