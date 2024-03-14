import { Component } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.css']
})
export class SearchImageComponent {
  nameImage: string = "";

  constructor(private imageSrv : ImageService) {

  }

  buscarImagenes() {
    this.imageSrv.setIsValidResult(false);
    if (!this.nameImage) {
      this.imageSrv.error("Error, escriba el nombre de imagenes a buscar");
      return;
    }
    this.imageSrv.setTermSearch(this.nameImage);
  }

}
