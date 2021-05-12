import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  // private REST_API_SERVER = "http://localhost:3000"; 

  constructor(private http: HttpClient) {

  }
  getData(placeValue) {
    const result = this.http.get('/api/getdata', {
      params: {
        place: placeValue,
      },
      observe: 'response'
    });
    console.log(result)
    return result
  }

}
