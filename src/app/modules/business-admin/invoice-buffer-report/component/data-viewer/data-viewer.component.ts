import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OCRService } from 'src/app/services/ocr.service';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.scss']
})
export class DataViewerComponent implements OnInit {
  responseData: any;
  isLoading: boolean = true;
  error: string = '';

  constructor(
    private ocrService: OCRService,
    private dialogRef: MatDialogRef<DataViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data.type === 'xml') {
      this.getXMLData();
    } else if (this.data.type === 'sync') {
      this.getSyncData();
    }
  }

  getXMLData() {
    this.ocrService.getInvoiceById(this.data.id).subscribe({
      next: (res: any) => {
        this.responseData = res;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load XML data';
        this.isLoading = false;
      }
    });
  }

  getSyncData() {
    this.ocrService.getSyncData(this.data.id).subscribe({
      next: (res: any) => {
        this.responseData = res;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load sync data';
        this.isLoading = false;
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  formatJSON(data: any): string {
    try {
      if (typeof data === 'string') {
        // Try to parse if it's a JSON string
        try {
          const parsed = JSON.parse(data);
          return JSON.stringify(parsed, null, 2);
        } catch {
          return data;
        }
      }
      return JSON.stringify(data, null, 2);
    } catch {
      return data;
    }
  }
}
