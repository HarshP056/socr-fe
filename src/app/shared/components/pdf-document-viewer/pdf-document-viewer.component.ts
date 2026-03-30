import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'src/app/services';

@Component({
  selector: 'app-pdf-document-viewer',
  templateUrl: './pdf-document-viewer.component.html',
  styleUrls: ['./pdf-document-viewer.component.scss'],
  standalone: false
})
export class PdfDocumentViewerComponent {
  isLoading: boolean = false;
  fileDocId: any;
  downloadFile:any;
  urlSafe: any;
  selectedTab:number=1;
  systemId:any
  attachments:any[]=[]
  constructor(
    private sanitizer: DomSanitizer,
    private commonControllerService: CommonService,
    private dialogRef: MatDialogRef<PdfDocumentViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data)
    let pdfFiles ;
    let pdfFile ;
    if(this.data.type !== 'postedInvoiceData'){
       this.systemId = this.data.logicalSystem;
       this.attachments = this.data.attachments;
       pdfFiles= this.attachments.filter((item:any)=>(item.filetype === 'PDF' || item.filetype === 'pdf'));
       pdfFile = pdfFiles.filter((item:any)=>item.category === 'Primary Doc');
    }
    else{
      this.systemId = this.data.data.logicalSystem;
      this.attachments = this.data.data.attachments;
      pdfFiles= this.attachments.filter((item:any)=>(item.filetype === 'PDF' || item.filetype === 'pdf'));
      pdfFile = pdfFiles;

    }
    console.log(pdfFile)
    this.fileDocId = pdfFile[0].documentid
    this.getPdf();
  }

  onTabchange(val: number) {
    this.selectedTab = val;
  }

  // showDoc(value:any){
  //   if(this.data.length > 0){
  //     if(value==='increment' && this.index < this.data.length){
  //         this.index++;
  //     } else if(value==='decrement' && this.index > 1){
  //         this.index--;
  //     }
  //     this.getPdf()
  //   }
  // }

  getDoc(item:any){
    console.log(item.filetype)
    this.commonControllerService.downloadDocURL(item.documentid, this.systemId).subscribe((res)=>{
      // this.downloadFile =  res.status;
      window.open(res.status, '_blank');
    })
  }


  private getPdf() {
    this.commonControllerService.downloadDocURL(this.fileDocId, this.systemId).subscribe((res) => {
      this.urlSafe = res.status;
      this.isLoading = false;
    });
  }
}
