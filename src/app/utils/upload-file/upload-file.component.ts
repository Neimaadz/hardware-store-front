import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  fileName = '';
  @Output() uploadFileEvent = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {
  }


  onFileSelected(event : any) {
    const file: File = event.target.files[0] ? event.target.files[0] : null;
    if (file) {
      this.fileName = file.name
      this.uploadFileEvent.emit(file);
    }
  }
}
