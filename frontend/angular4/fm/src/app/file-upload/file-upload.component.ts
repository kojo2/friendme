import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '../upload.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  // this code is from https://stackoverflow.com/questions/40214772/file-upload-in-angular
  // by Tarion
  // accessed 05/08/2018

  constructor(private service:UploadService) { }

  

  ngOnInit() {
  }

   selectFile(event) {
     //this.uploadFile(event.target.files,this);
     this.encodeImageFileAsURL(event.target,this);
   }
  
  uploadFile(files: FileList, thisObj) {
    if (files.length == 0) {
      console.log("No file selected!");
      return
  
    }
    let file: File = files[0];
    
    //this.encodeImageFileAsURL(file);
  }
  
  encodeImageFileAsURL(element,thisObj) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      console.log('RESULT', reader.result)
      thisObj.service.upload(reader.result).subscribe((response)=>{
        alert(response);
      })
    }
    reader.readAsDataURL(file);
  }
    
}