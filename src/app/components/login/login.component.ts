import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  data:any={}
  ngOnInit() {
    if(localStorage.getItem("token")){
      window.location.href="/dashboard"
    }
    $(document).ready(function () {
      $("#btn").click(function () {
        
        var email=$('#email').val();
        var password=$('#password').val();
        var indexat = email.indexOf("@");
        var indexdot = email.indexOf(".");
      if(email==""){
        
        $('#email').focus(); 
       $("#emailLabel").text("enter email id");
       return false;
      }
      else if (password == "" ){
        $("#password").focus();
        $("#passwordLabel").text("enter password");
        return false;
      }
      else if (indexat < 1 || (indexdot - indexat) < 2){
       
        $("#email").focus();
        $("#emailLabel").text("enter valid email id");
        return false;
      }
        $.ajax({
          url: "http://34.213.106.173/api/user/adminLogin",
          type: "POST",
          data: {
            "email": email,
            "password": password
          },
          dataType: "json",
          success:function(response){
            if(response){
              console.log(response)
              console.log(response.id)

              localStorage.setItem("token",response.id)
              window.location.href = "/dashboard"   
              
            }
           
          },error:function(err){
            if(err){
              console.log(err)
              alert("something went wrong enter the details again")
            }
          }
          
        })
        return false;
       
      });
    });
  }

 
}
