import { Inject, Component } from '@angular/core';
import { SmartKeyStoreConfigService } from 'src/app/services/smart-key-store.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SystemConfigComponent } from '../system-config.component';
import { SystemConfigService } from 'src/app/services/system-config.service';

@Component({
  selector: 'app-system-config-details',
  templateUrl: './system-config-details.component.html',
  styleUrls: ['./system-config-details.component.scss']
})
export class SystemConfigDetailsComponent {
  smartKeyStoreConfigModel= {
    key: '',
    value: ''
  };
  showForm: boolean = false;
  constructor(
    private sysConfigService: SystemConfigService,
    private dialogRef: MatDialogRef<SystemConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    if (this.data) {
      this.getUser();
    } else {
      this.smartKeyStoreConfigModel = {
        key: '',
        value: ''
      };
    }
    this.showForm = true;
  }
  getUser() {
    this.sysConfigService.getSystemConfigById(this.data).subscribe({
      next: (res: any) => {
        this.smartKeyStoreConfigModel = res;
      },
      error: (err: any) => {
      },
    });
  }
  saveUser() {
    if (!this.data) {
      this.sysConfigService.postSmartKeyStoreConfig(this.smartKeyStoreConfigModel).subscribe({
        next: (res: any) => {
          this.dialogRef.close('success');
        },
        error: (err: any) => {},
      });
    } else {
      this.sysConfigService.updateSmartKeyStoreConfig(this.smartKeyStoreConfigModel, this.data).subscribe({
        next: (res: any) => {
          this.dialogRef.close('success');
        },
        error: (err: any) => {},
      });
    }    
  }
  ngOnDestroy() {}
}
