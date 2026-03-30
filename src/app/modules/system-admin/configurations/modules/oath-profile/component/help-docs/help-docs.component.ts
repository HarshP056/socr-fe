import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { OathDialogComponent } from '../oath-dialog.component';

@Component({
  selector: 'app-help-docs',
  templateUrl: './help-docs.component.html',
  styleUrls: ['./help-docs.component.scss']
})
export class HelpDocsComponent {
  selectedTab:number=1;

  constructor( 
    private dialog: NgDialogAnimationService,
    private dialogRef: MatDialogRef<OathDialogComponent>){}

  onTabchange(val: number) {
    this.selectedTab = val;
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
