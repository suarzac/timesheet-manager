import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// import models
import { Timecard } from './Timecard';

// QUESTION: Should crud services be split into a service for each component.
// e.g. user_crud.service.ts, timecard_crud.service.ts etc..

@Injectable({
  providedIn: 'root'
})

export class TimecardService {

// Node/Express API
// setting base url to /user.. previously /
REST_API: string = 'http://localhost:8000/api/timecard';

// Http Header
httpHeaders = new HttpHeaders().set('ContentType', 'application/json');

constructor(private httpClient: HttpClient) { }

  // Add
  AddTimecard(data: Timecard): Observable<any> {
    let API_URL = `${this.REST_API}/add`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get all objects
  GetTimecards() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  // Get single object
  GetTimecard(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Update
  updateTimecard(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/update/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteTimecard(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
