import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http'; 
import { Carplate, CarplatePaginated } from '../models/Carplate';
import { Observable, throwError } from 'rxjs';
import { delay, max, catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

// const params = new HttpParams().append('age', '100');

@Injectable({
  providedIn: 'root'
})
export class CarplateService {
  carplatesUrl:string = 'http://localhost:8081/api/carplates';
  carplatesLimit = '?items_per_page=5';

  constructor(private http:HttpClient) { }

  getCarplates():Observable<CarplatePaginated> 
  {
    return this.http.get<CarplatePaginated>(`${this.carplatesUrl}${this.carplatesLimit}`)
      // .pipe(
      //     retry(2),
      //     catchError(this.handleError)
      // );
  }

  // handleError(errorResponse: HttpErrorResponse) {
  //   console.log("HandleError was hit");
  //   if(errorResponse.error instanceof ErrorEvent) {
  //     console.error("Client side error: ", errorResponse.error.message);
  //   } else {
  //     console.error("Server side error: ", errorResponse);
  //   }

  //   return throwError("There is a problem with the service!!!! We are notified and working on it!! kk bro");
  // }

  deleteCarplate(carplate:Carplate):Observable<Carplate> {
    console.log("delete finally this carplate");
    const url = `${this.carplatesUrl}/${carplate._id}`;
    return this.http.delete<Carplate>(url, httpOptions);
  }

  addCarplate(carplate:Carplate):Observable<Carplate> {
    console.log("add new this carplate");
    console.log(carplate);
    return this.http.post<Carplate>(this.carplatesUrl, carplate, httpOptions)
      // .pipe(catchError(this.handleError));
  }
};
