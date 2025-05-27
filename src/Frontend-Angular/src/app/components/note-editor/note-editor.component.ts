import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteEditorComponent implements AfterViewInit {
  @Input() contentInput = '';              // HTML que llega desde el padre
  @Output() save = new EventEmitter<string>();

  @ViewChild('editor', { static: true })
  private editor!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    this.editor.nativeElement.innerHTML = this.contentInput;
  }


  onSave() {
    const html = this.editor.nativeElement.innerHTML;
    this.save.emit(html);
  }
}

