import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MediaItem } from 'src/app/model/product.model';

@Component({
  selector: 'app-media-modal',
  templateUrl: './media-modal.component.html',
  styleUrls: ['./media-modal.component.scss']
})
export class MediaModalComponent implements OnInit {
  public imageMedia: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { mediaList: MediaItem[] }) { }

  ngOnInit(): void {
    this.imageMedia = this.data.mediaList.length > 0 ? this.data.mediaList.filter(({ mimetype }) => mimetype.includes('image')).map(({ filename }) => filename) : []
  }

}
