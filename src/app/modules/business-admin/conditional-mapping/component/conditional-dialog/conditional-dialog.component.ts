import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/services';
import { ConditionalMappingComponent } from '../../conditional-mapping.component';
import { LogicalSystemService } from 'src/app/services/logical-system.service';
import { ConditionMappingService } from 'src/app/services/conditional-mapping.service';

@Component({
  selector: 'app-conditional-dialog',
  templateUrl: './conditional-dialog.component.html',
  styleUrls: ['./conditional-dialog.component.scss']
})
export class ConditionalDialogComponent implements OnDestroy, OnInit{
  
    mapping:any= {
      id: '',
      description: '',
      erpCode: '',
      erpDescription: '',
      generalLedger: '',
      logicalSystem: '',
      taxCode: '',
    };
    logicalSytemList:any=[]
    showForm: boolean = false;
  
    constructor(
      private mappingService: ConditionMappingService,
      private commonService: CommonService,
      private logicalSystemService: LogicalSystemService,
      private dialogRef: MatDialogRef<ConditionalDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    ngOnInit() {
      if (this.data) {
        this.getMapping();
      } else {
        this.mapping = {
          description: '',
          erpCode: '',
          erpDescription: '',
          generalLedger: '',
          logicalSystem: '',
          taxCode: '',
        };
      }
      this.getLogicalSystem();
      this.showForm = true;
    }
  
    getMapping() {
      this.mappingService.getMappingById(this.data).subscribe({
        next: (res: any) => {
          this.mapping = res.result;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  
    private getLogicalSystem() {
      this.logicalSystemService.getAllLogicalSystems().subscribe((res: any) => {
        this.logicalSytemList = res;
      });
    }
  
    saveMapping() {
      if (!this.data) {
        delete this.mapping.id;
  
        this.mappingService.saveMapping(this.mapping).subscribe({
          next: (res: any) => {
            this.dialogRef.close('success');
          },
          error: (err: any) => {},
        });
      } else {
        this.mappingService.updateMapping(this.mapping, this.data).subscribe({
          next: (res: any) => {
            this.dialogRef.close('success');
          },
          error: (err: any) => {},
        });
      }    
    }
  
    ngOnDestroy() {}
}
