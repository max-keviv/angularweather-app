import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServiceService } from '../app-service.service'
import * as $ from "jquery";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  Weather
  imageUrl
  myDate
  flag = true
  constructor(private service: AppServiceService) { }
  placeValue
  ngOnInit() {
    this.flag = true;
  }

  //  For api call
  searchFunction(event) {
    this.placeValue = $('#inputPlace').val();
    this.service.getData(this.placeValue).subscribe((Response) => {
      console.log("response from API is", Response)
      this.Weather = Response;
      this.imageUrl = "http://openweathermap.org/img/wn/" + this.Weather.body.weather[0].icon + "@4x.png"
      this.myDate = new Date(this.Weather.body.dt * 1000).toUTCString();
      this.flag = false;
    }, (error) => {
      console.log("error is", error);
    },
    );
  }
  closeFunction(event) {
    this.flag = true;
  }

}
