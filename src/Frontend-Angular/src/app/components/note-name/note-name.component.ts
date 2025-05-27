import { ChangeDetectionStrategy, Component, ElementRef, Host, HostListener, inject, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-note-name',
  imports: [],
  templateUrl: './note-name.component.html',
  styleUrl: './note-name.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteNameComponent {

  editingMode = signal<boolean>(false);
  currentName =  input.required<string>();
  newName = output<string>();
  elRef = inject(ElementRef);

  alternateEditingMode(){
    this.editingMode.set(!this.editingMode());
  }

  focusInput() {
    const input = document.getElementById('inputNoteName') as HTMLInputElement;
    console.log('Focusing input:', input);
    if (input) {
      input.focus();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
   
    const isClickInside = this.elRef.nativeElement.contains(event.target);

    if (!isClickInside) {
      this.editingMode.set(false);
    }
  }

  @HostListener('enter', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const input = document.getElementById('inputNoteName') as HTMLInputElement;
      if (input) {
        this.newName.emit(input.value);
        console.log('Emitting new name:', input.value);
        this.editingMode.set(false);
      }
    }
  }

}
