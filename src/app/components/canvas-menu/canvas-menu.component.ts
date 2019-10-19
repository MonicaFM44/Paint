import {
  Component, Output, EventEmitter
} from '@angular/core';

@Component({
  selector: 'canvas-menu',
  templateUrl: './canvas-menu.component.html',
  styleUrls: ['./canvas-menu.component.scss']
})
export class CanvasMenuComponent {
  @Output() clickRedo: EventEmitter<void> = new EventEmitter<void>();
  @Output() clickUndo: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeColor: EventEmitter<string> = new EventEmitter<string>();
  @Output() changeLineWidth: EventEmitter<number> = new EventEmitter<number>();

  colors = ['red', 'blue', 'black'];
  colorSelected = 'black';

  widths = ['2', '5', '10'];
  widthSelected = '5';

  constructor() { }

  onClickUndo() {
    this.clickUndo.emit();
  }

  onClickRedo() {
    this.clickRedo.emit();
  }

  onChangeColor(color: string) {
    this.changeColor.emit(color);
  }

  onChangeLineWidth(width: number) {
    this.changeLineWidth.emit(width);
  }

}
