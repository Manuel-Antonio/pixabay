import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageService } from './services/image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  suscription = new Subscription();
  title = 'Pixabay';
  isLoading : boolean = false;
  constructor(private imageServ : ImageService) {

  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  ngOnInit(): void {
    this.suscription = this.imageServ.getIsLoading().subscribe( data => this.isLoading = data);
  }

}
