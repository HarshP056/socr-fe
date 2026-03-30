import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ERPSyncService } from 'src/app/services/erp-sync.service';
import { ERPSyncLogsComponent } from '../erp-sync-logs.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'erp-dialog',
  templateUrl: './erp-dialog.component.html',
  styleUrls: ['./erp-dialog.component.scss'],
})
export class ERPDialogComponent implements OnDestroy, OnInit {
  errorLog: any={};

  constructor(
    private erpSyncService: ERPSyncService,
    private dialogRef: MatDialogRef<ERPSyncLogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getERPSyncLog();
  }

  getERPSyncLog() {
    this.erpSyncService.getErpSyncLogById(this.data).subscribe({
      next: (res: any) => {
        this.errorLog = res.result;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy() {}
}
