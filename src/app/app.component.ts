import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CanvasComponent } from './components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Output() redo: EventEmitter<void> = new EventEmitter<void>();
  @Output() undo: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('canvas') canvasComponent: CanvasComponent;
  @ViewChild('drawingCanvas') canvasElement: ElementRef;

  canvasHeight: number;
  canvasWidth: number;

  ngOnInit() {
    this.canvasHeight = this.canvasElement.nativeElement.offsetHeight;
    this.canvasWidth = this.canvasElement.nativeElement.offsetWidth;
  }

  undoDrawing() {
    this.canvasComponent.undoStroke();
  }

  redoDrawing() {
    this.canvasComponent.redoStroke();
  }

  changeColorStroke(color: string) {
    this.canvasComponent.changeColorLine(color);
  }

  changeLineWidth(width: number) {
    this.canvasComponent.changeLineWidth(width);
  }

}
