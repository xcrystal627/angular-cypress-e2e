/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, NgModule, NgZone, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[ClickOutsideDirective]',
  standalone: true
})
export class ClickOutsideDirective implements AfterViewInit {

  @Output() onOutside: EventEmitter<Event> = new EventEmitter();
  @Output() onInside: EventEmitter<Event> = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone
  ) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      fromEvent<Event>(window, 'mousedown').pipe(tap((e: Event) => e.stopPropagation())).subscribe((e: Event) => {
        const clickedInside = this.elementRef.nativeElement.contains(e.target);

        if (clickedInside) {
          this.emitEvent(this.onInside, e);

          return;
        }
        this.onOutside.emit(e);
        this.emitEvent(this.onOutside, e);
      });
    });
  }

  private emitEvent(instanceOutput: EventEmitter<Event>, event: Event) {
    this.zone.run(() => {
      instanceOutput && instanceOutput.emit(event);
    });
  }

}
