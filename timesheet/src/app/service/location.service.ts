
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  //Add the url to hook up to api
  private _url: string = "http://localhost:8000/api/location"

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(this._url)
    .pipe(catchError(this.errorHandler))
   }

  getLocationsById(id: number): Observable<Location[]>{
    return this.http.get<Location[]>(this._url + '/read/' + id)
    .pipe(catchError(this.errorHandler));
  }

  postLocation(locData: any): Observable<Location[]>{
    return this.http.post<Location[]>(this._url + '/add', locData)
    .pipe(catchError(this.errorHandler));
  }

  updateLocation(id: string, locData: any): Observable<Location[]>{
    console.log(locData)
    console.log(this._url + '/update/' + id)
    return this.http.put<Location[]>(this._url + '/update/' + id, locData)
    .pipe(catchError(this.errorHandler));
  }

  deleteLocation(id: string) {
    return this.http.delete(this._url + '/delete/' + id);
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error")
   }

}
