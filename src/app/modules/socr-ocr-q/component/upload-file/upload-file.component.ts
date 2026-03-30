import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { OcrConfigService, OcrProjectService } from 'src/app/services';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit{

  isLoading: boolean = false;
  initialLoader: boolean = false;
  projectId: any;
  file: any;
  project: any[] = [];
  selectedProject: any;
  hideProjectInput: boolean = false;
  files: File[] = [];

  constructor(private _testService: TestService,
    private messageService: MessageService, 
    private ocrConfigService: OcrConfigService,
    private dialogRef: MatDialogRef<UploadFileComponent>,
    private ocrProjectService : OcrProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getOcrProjects();
    console.log(this.data);
    if(this.data) {
      this.hideProjectInput = true;
    }
  }

  sendFileToMDI() {
    const form = new FormData();
    this.files.forEach(file => {
      form.append('files', file, file.name);
    });
    this.uploadFile(form);
  }

  uploadFile(formData: any) {
    this.isLoading = true;
    this._testService.uploadFileToMDI(formData, this.data).subscribe({
      next: (resp: any) => {
        if(resp.status=="success"){
          this.isLoading = false;
          this.projectId = '';
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Invoice Analyzed Successfully',
            
          });
          this.dialogRef.close(resp.result);
        }
        
      },
      error: (err: any) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Fail to analyze invoice',
        });
      },
    })
  }

  removeFile(fileName?: string) {
    if (fileName) {
      this.files = this.files.filter(f => f.name !== fileName);
    } else {
      this.files = [];
    }
  }

  queyList: any = {
    page: 1,
    limit: 50,
    order: "-projectNameOrGuid"
  }

  onFileSelect(event: any) {
    const selected = Array.from(event.target.files) as File[];
    selected.forEach(newFile => {
      if (!this.files.find(f => f.name === newFile.name)) {
        this.files.push(newFile);
      }
    });
    event.target.value = '';
  }

  getOcrProjects() {
    this.ocrProjectService.getOcrProjectsPage(this.queyList).subscribe({
      next: (res: any) => {
        this.project = res['content'];
        this.initialLoader = false;
      },
      error: (err: any) => {
        this.initialLoader = false;
      },
    });
  }

}
