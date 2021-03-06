import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {

  authToken : any;
  user: any;
  
  constructor(private http: Http) { }

  registerUser(user){
    console.log("INSIDE REGISTER USER");
    
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register',user, {headers: headers})
    .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user, {headers: headers})
    .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
    .map(res => res.json());
  }

  addSuggestion(suggestion){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('content-Type', 'application/json');
    return this.http.post('http://localhost:3000/suggestion/add',suggestion, {headers: headers})
    .map(res => res.json());
  }

  getSuggestionList(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('content-Type', 'application/json');
    return this.http.get('http://localhost:3000/suggestion/getAll', {headers: headers})
    .map(res => res.json());
  }



  storeUserData(token, user){
    localStorage.setItem('id_token', token) ;
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    console.log(this.authToken);
  }

  loggedIn(){
    // console.log("LoggedIn Status: " + JSON.stringify(tokenNotExpired()));
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
