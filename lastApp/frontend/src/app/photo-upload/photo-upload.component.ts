import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpHeaders } from '@angular/common/http';
import { AlertifyService } from '../services/alertify.service';


const URL = 'http://127.0.0.1:5000/uploadImage';


@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;


  constructor( private alert: AlertifyService) { }





  ngOnInit() {
    this.initializeUploader();
  }


  initializeUploader() {
    this.uploader = new FileUploader({
      url: URL,
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: any = JSON.parse(response);
        console.log(item);
      }
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.alert.success('Succesfully updated');
      console.log(item);
    };
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = (item => {
      item.withCredentials = false;
    });
  }

}
