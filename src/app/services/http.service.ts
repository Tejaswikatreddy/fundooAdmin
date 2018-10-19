import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }
  post(data){
    console.log("service function")
    $.ajax({
      url: "http://34.213.106.173/api/user/adminLogin",
      type: "POST",
      data: data,
      dataType: "json",
      contentType: "application/json"
    })
      .done(function (data) {
        console.log("Response " + JSON.stringify(data));
      })
  }
   
  }

