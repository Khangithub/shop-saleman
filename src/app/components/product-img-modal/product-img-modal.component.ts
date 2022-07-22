import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-img-modal',
  templateUrl: './product-img-modal.component.html',
  styleUrls: ['./product-img-modal.component.scss']
})
export class ProductImgModalComponent implements OnInit {
  @Input('visible') showModal: boolean = false;
  @Output() modalClose = new EventEmitter<boolean>();
ß
  constructor() { }

  ngOnInit(): void {
  }

  handleOkMiddle(): void {
    console.log('click ok');
    this.modalClose.emit(false);
  }

  handleCancelMiddle(): void {
    this.modalClose.emit(false);
  }
}
