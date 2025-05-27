import { ChangeDetectionStrategy, Component, input, OnInit, output, signal } from '@angular/core';

@Component({
  selector: 'app-note-editor',
  imports: [],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteEditorComponent implements OnInit {

  contentInput = input<string>('');
  content = signal<string>(this.contentInput());

  save = output<string>();

  onSave() {
    if (this.content()) {
      this.save.emit(this.content());
    }
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.content.set(inputElement.innerHTML);
  }

  ngOnInit() {
    this.content.set(this.contentInput());
  }
}
