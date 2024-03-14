import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css']
})
export class ListImageComponent implements OnDestroy {
  suscription?: Subscription

  term: string = "";
  imagenesList: any[] = [];
  totalImage : number = 0;
  isValidResult : boolean = false;

  totalImagenes : number = 0;
  paginaActual : number = 1;
  imagenesPorPagina : number = 32;
  totalPaginas : number = 0;

  constructor(private imageSrv: ImageService) {
    this.suscription = this.imageSrv.getTermSearch().subscribe(data => {
      if(this.term != data){
        this.paginaActual = 1;
      }
      console.log(this.term );
      console.log(data);
      this.term = data;

      this.obtenerImagenes(this.term, this.imagenesPorPagina, this.paginaActual);
    });
    this.suscription = this.imageSrv.getIsValidResult().subscribe(data => this.isValidResult = data);
  }
  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  obtenerImagenes(value: string, imagenesPorPagina : number, pagina : number) {
    this.imageSrv.setIsLoading(true);
    this.imageSrv.getImagenes(value, imagenesPorPagina, pagina).subscribe(data => {
      if (data?.hits.length === 0) {
        this.imageSrv.error(`😿 No se encontró ningún resultado de : ${value}`);
        this.imageSrv.setIsValidResult(false);
        this.imageSrv.setIsLoading(false);
        return;
      }
      this.totalImagenes = +data?.totalHits;
      this.imageSrv.setIsValidResult(true);
      this.imageSrv.setIsLoading(false);
      this.imagenesList = data?.hits;
      this.totalImage = data?.totalHits;
      this.calcularTotalPaginas();
    }, error => {
      this.imageSrv.setIsLoading(false);
      this.imageSrv.setIsValidResult(false);
      this.imageSrv.error(`Ocurrió un error inesperado`);
    });
  }

  formatTag(tags : string) {
    return tags.split(",")
  }

  calcularTotalPaginas() {
    this.totalPaginas =  Math.ceil(this.totalImagenes / this.imagenesPorPagina );
  }

  anteriorPagina() {
    if(this.paginaActual === 1) {
      return;
    }
    this.paginaActual--;
    this.obtenerImagenes(this.term, this.imagenesPorPagina, this.paginaActual);
  }
  siguientePagina() {
    if(this.paginaActual === this.totalPaginas) {
      return;
    }
    this.paginaActual++;
    this.obtenerImagenes(this.term, this.imagenesPorPagina, this.paginaActual);
  }
}
