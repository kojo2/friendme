import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = "http://localhost:8080";

  constructor(private http:HttpClient, private router:Router) { }

  get(url,creds=true,text=false){
  	let response;
  	// do we want a text response type?
  	if(!text)
  		response = this.http.get(this.baseUrl+"/"+url,{withCredentials:creds});
  	else
  		response = this.http.get(this.baseUrl+"/"+url,{withCredentials:creds, responseType: 'text' });

    /*if(response.status = 400){
      this.router.navigate(['']);
    }*/
  	return response;
  }


  post(url,params,creds = true,text=false){
  	let response;
  	// do we want a text response type?
  	if(!text)
  		response = this.http.post(this.baseUrl+"/"+url,params,{withCredentials:creds});
  	else
  		response = this.http.post(this.baseUrl+"/"+url,params,{withCredentials:creds, responseType: 'text'});
    /*if(response.status = 400){
          this.router.navigate(['']);
    }*/
  	return response;
  }
}
