import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpService) { }

  upload(file){
    return this.http.post('upload',{file:file},false,true);
  }
}
