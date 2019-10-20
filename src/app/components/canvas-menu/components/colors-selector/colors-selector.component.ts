import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'colors-selector',
  templateUrl: './colors-selector.component.html',
  styleUrls: ['./colors-selector.component.scss']
})
export class ColorsSelectorComponent {
  @Output() changeColor: EventEmitter<string> = new EventEmitter<string>();

  colors = ['red', 'blue', 'black', 'aqua', 'yellow', 'purple', 'green', 'orange'];
  colorSelected = 'black';

  constructor() { }

  onChangeColor(color: string) {
    this.changeColor.emit(color);
  }

}
