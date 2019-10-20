import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'width-selector',
  templateUrl: './width-selector.component.html',
  styleUrls: ['./width-selector.component.scss']
})
export class WidthSelectorComponent {
  @Output() changeLineWidth: EventEmitter<number> = new EventEmitter<number>();

  widths = ['2', '5', '10'];
  widthSelected = '5';

  CLASS_WIDTH = {
    2: 'slim',
    5: 'thick',
    10: 'extra-thick'
  };

  constructor() { }

  onChangeLineWidth(width: number) {
    this.changeLineWidth.emit(width);
  }

}
