import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-fulltext',
  templateUrl: './fulltext.component.html',
  styleUrls: ['./fulltext.component.scss'],
})
export class FullTextPopupComponent {
  @Input() fullText: string;
  @Input() positionConfig: any;

  @Output() readonly removeContent = new EventEmitter<void>();


  protected handlerClickOutside() {
    this.removeContent.emit()
  }
}