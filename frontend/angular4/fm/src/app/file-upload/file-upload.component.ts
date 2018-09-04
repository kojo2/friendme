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
     this.uploadFile(event.target.files);
   }
  
  uploadFile(files: FileList) {
    if (files.length == 0) {
      console.log("No file selected!");
      return
  
    }
    let file: File = files[0];
    this.sendFile(file);
    
  
    // this.upload.uploadFile("localhost:8080/upload", file)
    //   .subscribe(
    //     event => {
    //       if (event.type == HttpEventType.UploadProgress) {
    //         const percentDone = Math.round(100 * event.loaded / event.total);
    //         console.log(`File is ${percentDone}% loaded.`);
    //       } else if (event instanceof HttpResponse) {
    //         console.log('File is completely loaded!');
    //       }
    //     },
    //     (err) => {
    //       console.log("Upload Error:", err);
    //     }, () => {
    //       console.log("Upload done");
    //     }
    //   )
  }
  
  sendFile(file: File) {

    let formData = new FormData();
    formData.append('upload', file);

    this.service.upload(file).subscribe((response)=>alert(response));

    // let params = new HttpParams();

    // const options = {
    //   params: params,
    //   reportProgress: true,
    // };

    //const req = new HttpRequest('POST', url, formData, options);
    //return this.http.request(req);
  }
}

