import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ChannelService } from 'src/app/services';

@Component({
  selector: 'app-upload-channel',
  templateUrl: './upload-channel.component.html',
  styleUrls: ['./upload-channel.component.scss']
})
export class UploadChannelComponent implements OnInit {

  file: any;
  @ViewChild('fileInput') fileInput: ElementRef;

  @Output() onsubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onclose: EventEmitter<null> = new EventEmitter<null>();
  
  constructor(
              private channelService: ChannelService,    
              private messageService: MessageService,
            ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.onclose.emit();
  }

  onFileSelect(event: any) {
    console.log(event.target.files[0]);
    console.log(this.file)
    this.file = {}
    this.file = event.target.files[0];
    console.log(this.file)

  }

  removeFile() {
    this.file = null;
    this.fileInput.nativeElement.value = '';
  }

  uploadFile() {
    let formData = new FormData();
    formData.append("file", this.file, this.file.name);
    this.channelService.uploadChannelFile(formData).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
        this.onsubmit.emit();
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Some error occurred!!',
        });
        this.onsubmit.emit();
      },
    });
  }

}
