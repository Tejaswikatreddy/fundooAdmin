/** Purpose         : Dashboard page
 *  @description
 *  @file           : dashboard.component.ts
 *  @author         : K.Dhana Tejaswi
*/

import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import "datatables.net";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   //getting the token from the local storage
    var token = localStorage.getItem("token")
    console.log(token)
    $(document).ready(function () {
      var rowIndex;
      //when the button with id "btn" is clicked the function is called
      $("#btn").click(function () {
        //calling a backend api using AJAX call
        $.ajax({
          url: "http://34.213.106.173/api/user/logout",
          headers: {
            'Authorization': token
          },
          type: "POST",
          success: function (response) {
            //when the api returns the response without any error
            console.log(response);
            localStorage.removeItem("token")
        window.location.href = "/adminlogin"  
          } 
      })
      }),
      //calling a backend api using AJAX call
      $.ajax({
        url: "http://34.213.106.173/api/user/UserStatics",
        headers: {
          'Authorization': token
        },
        type: "GET",
        success: function (response) {
          console.log(response.data.details)
          var arr = response.data.details


          var html = '';
          for (let index = 0; index < arr.length; index++) {
            html += "<div class='col-xs-6'><div class='card bg-warning shadow-lg p-3 mb-5  rounded'>";
            html += "<div class='card-title align-self-center'>" + arr[index].service + " </div><hr>";
            html += "<div class= 'card-body align-self-center'>" + arr[index].count + " </div>";
            html += "</div></div>";
          }
          //rendering the content on to a html page
       
          $("#services").html(html);
        },
        error: function (err) {
          console.log(err);
          
        }

      });
      //calling a backend api using ajax call
      $.ajax({
        url: "http://34.213.106.173/api/user/getAdminUserList",
        type: "GET",
        success: function (response) {
          console.log(response.data.data)
          var list = []
          console.log(response.data.data[0].firstName)
          for (let i = 0; i <response.data.data.length; i++) {
            list.push([i+1, response.data.data[i].firstName, response.data.data[i].lastName, response.data.data[i].email,
              response.data.data[i].service]);
          }
          console.log(list)
         var table = $('#tableList').DataTable({
            "data": list,
            "columnDefs": [{
              "targets": 5,
             
              "render": function (data, type, row, meta) {
                return '<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal">click for Details</button>';
              }
            }]
          });
          $('#tableList tbody').on('click', 'tr', function () {
            rowIndex= table.row(this).index()
            console.log(response.data.data[rowIndex].id);
            
                var html=""
                html += "<p>FirstName : &nbsp;&nbsp;&nbsp;" + response.data.data[rowIndex].firstName+"</p>"
                html += "<p>LastName: &nbsp;&nbsp;&nbsp;" + response.data.data[rowIndex].lastName + "</p>"
                html += "<p>username: &nbsp;&nbsp;&nbsp;" + response.data.data[rowIndex].username + "</p>"
                html += "<p>phoneNumber: &nbsp;&nbsp;&nbsp;" + response.data.data[rowIndex].phoneNumber + "</p>"
                html += "<p>Role: &nbsp;&nbsp;&nbsp;" + response.data.data[rowIndex].role + "</p>"
                html += "<p>Service: &nbsp;&nbsp;&nbsp;" + response.data.data[rowIndex].service + "</p>"
                html += "<p>createdDate: &nbsp;&nbsp;&nbsp;" + response.data.data[rowIndex].createdDate + "</p>"
                html += "<p>email: &nbsp;&nbsp;&nbsp;" + response.data.data[rowIndex].email + "</p>"
                html += "<p>emailVerified: &nbsp;&nbsp;&nbsp;" + response.data.data[rowIndex].emailVerified + "</p>"
                
                console.log(response);
            $("#heading").html(response.data.data[rowIndex].firstName + " " + response.data.data[rowIndex].lastName )
                $("#details").html(html);
              
          
          
        })
          },
        error: function (err) {
          console.log(err);
        }
      });

   
    
    })

}
}