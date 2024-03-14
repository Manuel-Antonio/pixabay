import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {
  errorSubs !: Subscription
  isError: boolean = false;
  txtError : string = "";
  
  constructor(private imageSrv: ImageService){}

  ngOnDestroy(): void {
    this.errorSubs.unsubscribe
  }
  ngOnInit(): void {
    this.imageSrv.getIsError().subscribe( data => this.isError = data);
    this.imageSrv.getTxtError().subscribe( data => this.txtError = data);
  }
  
}
