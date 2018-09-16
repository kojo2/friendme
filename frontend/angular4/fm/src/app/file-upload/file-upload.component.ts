import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '../upload.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  constructor(private service:UploadService) { }

  

  ngOnInit() {
  }

   selectFile(event) {
     this.encodeImageFileAsURL(event.target,this);
   }
  
  uploadFile(files: FileList, thisObj) {
    if (files.length == 0) {
      console.log("No file selected!");
      return
  
    }
    let file: File = files[0];
  
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