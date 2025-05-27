import { ChangeDetectionStrategy, Component, ElementRef, Host, HostListener, inject, input, signal } from '@angular/core';

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
  elRef = inject(ElementRef);

  alternateEditingMode(){
    this.editingMode.set(!this.editingMode());
  }

  focusInput() {
    const input = document.getElementById('inputNoteName') as HTMLInputElement | null;
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

}
