import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  isError$ = new Subject<boolean>();
  txtError$ = new Subject<string>();
  termSearch$ = new Subject<string>();
  isLoading$ = new Subject<boolean>();
  isValidResult$ = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  setIsValidResult(value: boolean): void {
    this.isValidResult$.next(value);
  }
  getIsValidResult(): Observable<boolean> {
    return this.isValidResult$.asObservable();
  }

  setIsLoading(value: boolean): void {
    this.isLoading$.next(value);
  }
  getIsLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  setIsError(value: boolean): void {
    this.isError$.next(value);
  }
  getIsError(): Observable<boolean> {
    return this.isError$.asObservable();
  }

  setTxtError(value: string): void {
    this.txtError$.next(value);
  }
  getTxtError(): Observable<string> {
    return this.txtError$.asObservable();
  }

  setTermSearch(value: string): void {
    this.termSearch$.next(value);
  }
  getTermSearch(): Observable<string> {
    return this.termSearch$.asObservable();
  }

  getImagenes(term: string, cantPorPage : number = 20, page: number = 1): Observable<any> {
    const key = "42861705-e6cf5068978e23d1da0c1fd57";
    const url = `https://pixabay.com/api/?key=${key}&q=${term}&per_page=${cantPorPage}&page=${page}`;
    return this.http.get(url);

  }

  error(message: string) {
    this.setIsError(true);
    this.setTxtError(message);
    const timeout = setTimeout(() => {
      this.setIsError(false);
      this.setTxtError("");
      clearTimeout(timeout);
    }, 3000);
  }
}
