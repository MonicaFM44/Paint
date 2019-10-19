import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';

@Component({
  selector: 'drawing-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  @Input() width: number;
  @Input() height: number;

  @ViewChild('canvas') canvas: ElementRef;

  private cx: CanvasRenderingContext2D;
  private canvasEl: HTMLCanvasElement;

  drawingPoints = [];
  undoneDrawingPoints = [];

  constructor() { }

  ngOnInit() {
    this.initCanvas();
    this.lineConfiguration();
  }

  initCanvas(): void {
    this.getCanvas();

    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;

    this.captureEvents(this.canvasEl);
  }

  getCanvas(): void {
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    const mousedown$ = fromEvent(canvasEl, 'mousedown');
    const touchstart$ = fromEvent(canvasEl, 'touchstart');

    const mousemove$ = fromEvent(canvasEl, 'mousemove');
    const touchmove$ = fromEvent(canvasEl, 'touchmove');

    const mouseup$ = fromEvent(canvasEl, 'mouseup');
    const touchend$ = fromEvent(canvasEl, 'touchend');

    // this will capture all mousedown events from the canvas element
    merge(mousedown$, touchstart$)
      .pipe(
        switchMap(() => {
          // after a mouse down, we'll record all mouse moves
          return merge(mousemove$, touchmove$)
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event
              takeUntil(merge(mouseup$, touchend$)),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            );
        })
      )
      .subscribe((res: [any, any]) => { // TouchEvent or MouseEvent
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        let prevPos;
        let currentPos;

        if (res[0].type === 'mousemove') {
          prevPos = {
            x: res[0].clientX - rect.left,
            y: res[0].clientY - rect.top
          };

          currentPos = {
            x: res[1].clientX - rect.left,
            y: res[1].clientY - rect.top
          };
        } else {
          prevPos = {
            x: res[0].changedTouches[0].clientX - rect.left,
            y: res[0].changedTouches[0].clientY - rect.top
          };

          currentPos = {
            x: res[1].changedTouches[0].clientX - rect.left,
            y: res[1].changedTouches[0].clientY - rect.top
          };
        }

        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) { return; }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y); // to
      this.cx.stroke();
      this.drawingPoints.push({ prevPos, currentPos });
    }
  }

  lineConfiguration(): void {
    this.cx.globalCompositeOperation = 'source-over';
    this.cx.lineWidth = 5;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = 'black';
  }

  redoStroke() {
    this.cx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);

    if (this.undoneDrawingPoints) {
      this.drawingPoints.push(this.undoneDrawingPoints.pop());

      this.drawingPoints.map(point => {
        this.cx.beginPath();
        this.cx.moveTo(point.prevPos.x, point.prevPos.y); // from
        this.cx.lineTo(point.currentPos.x, point.currentPos.y); // to
        this.cx.stroke();
      });
    }
  }

  undoStroke() {
    this.cx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);

    if (this.drawingPoints) {
      this.undoneDrawingPoints.push(this.drawingPoints.pop());
      this.undoneDrawingPoints.push(this.drawingPoints.pop());
      this.undoneDrawingPoints.push(this.drawingPoints.pop());

      this.drawingPoints.map(point => {
        this.cx.beginPath();
        this.cx.moveTo(point.prevPos.x, point.prevPos.y); // from
        this.cx.lineTo(point.currentPos.x, point.currentPos.y); // to
        this.cx.stroke();
      });
    }
  }

  changeColorLine(color: string) {
    this.cx.strokeStyle = color;
  }

  changeLineWidth(width: number) {
    this.cx.lineWidth = width;
  }

}
