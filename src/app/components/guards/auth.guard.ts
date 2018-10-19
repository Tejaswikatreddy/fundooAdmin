import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(){
  if(localStorage.getItem('token')) {
  // logged in so return true
  return true;
}
    window.location.href = "/adminlogin";
    return false;
}
}
