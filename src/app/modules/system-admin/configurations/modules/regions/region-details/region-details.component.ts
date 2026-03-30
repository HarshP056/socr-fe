import { Component, Inject } from '@angular/core';
import { RegionService } from 'src/app/services/region.service';
import { RegionsComponent } from '../regions.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocIdRangeService } from 'src/app/services/doc-id-range.service';

@Component({
  selector: 'app-region-details',
  templateUrl: './region-details.component.html',
  styleUrls: ['./region-details.component.scss']
})
export class RegionDetailsComponent {
  smartKeySystemConfig= {
    docIdRange: '',
    name: '',
  };
  docIdRangeData: any=[]
  showForm: boolean = false;
  constructor(
    private regionService: RegionService,
    private docIdRangeService: DocIdRangeService,
    private dialogRef: MatDialogRef<RegionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data) {
      this.getUser();
    } else {
      this.smartKeySystemConfig = {
        docIdRange: '',
        name: '',
      };
    }
    this.showForm = true;
    this.getDocIdRange();
  }

  getDocIdRange() {
    this.docIdRangeService.getAllDocIdRange().subscribe({
      next: (res: any) => {
        this.docIdRangeData = res;
      },
      error: (err: any) => {
      },
    });
  }
  getUser() {
    this.regionService.getRegionById(this.data).subscribe({
      next: (res: any) => {
        this.smartKeySystemConfig = res;
      },
      error: (err: any) => {
      },
    });
  }
  saveUser() {
    if (!this.data) {
      this.regionService.createRegion(this.smartKeySystemConfig).subscribe({
        next: (res: any) => {
          this.dialogRef.close('success');
        },
        error: (err: any) => {},
      });
    } else {
      this.regionService.updateRegion(this.smartKeySystemConfig, this.data).subscribe({
        next: (res: any) => {
          this.dialogRef.close('success');
        },
        error: (err: any) => {},
      });
    }    
  }
  ngOnDestroy() {}
}
