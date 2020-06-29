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

  constructor(private http:HttpClient) { }

  getCarplates( query:String ):Observable<CarplatePaginated> 
  {
    return this.http.get<CarplatePaginated>(`${this.carplatesUrl}${query}`);
  }

  deleteCarplate(carplate:Carplate):Observable<Carplate> {
    console.log("delete controller finall");
    const url = `${this.carplatesUrl}/${carplate._id}`;
    return this.http.delete<Carplate>(url, httpOptions);
  }

  addCarplate(carplate:Carplate):Observable<Carplate> {
    return this.http.post<Carplate>(this.carplatesUrl, carplate, httpOptions)
  }

  updateCarplate(carplate:Carplate):Observable<Carplate> {
    return this.http.put<Carplate>(`${this.carplatesUrl}/${carplate._id}`, carplate, httpOptions)
  }
};
