import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageUserService } from 'src/app/services';
import { AzureAiConfigComponent } from '../azure-ai-config.component';
import { AzureAiService } from 'src/app/services/azure-ai.service';

@Component({
  selector: 'app-open-azure-ai-dialog',
  templateUrl: './open-azure-ai-dialog.component.html',
  styleUrls: ['./open-azure-ai-dialog.component.scss']
})
export class OpenAzureAiDialogComponent implements OnInit {

  azureAI: any = {
    id:'',
    name:'',
    apiKey:'',
    endpoint:'',
    apiVersion:''
  };
  isWait: boolean = false;
  isDelete: boolean = false
  editMode: boolean = false;
  showPassword:boolean = false;
  showKey: boolean = false;

  constructor(
    private messageSer: MessageUserService,
    private azureAIService: AzureAiService,
    private router : Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AzureAiConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    if(this.data){
      this.getAzureAIConfig();
    }
  }

    private getAzureAIConfig() {
    console.log(this.data)
    this.azureAIService.getAzureAIConfig(this.data).subscribe({
      next: (res: any) => {
        if(res){
          this.azureAI = res.result;
          this.editMode = true;
        } else{
          this.azureAI={
            id:'',
            name:'',
            apiKey:'',
            endpoint:'',
            apiVersion:''
          }
          this.editMode = false;
        }
      },
      error: (error) => {
        this.azureAI={
          id:'',
          name:'',
          apiKey:'',
          endpoint:'',
          apiVersion:''
        }
      },
    });
  }

  submit() {
    if(this.editMode){
      this.updateAzureAIConfig();
      return;
    }
    else{
      this.createAzureAIConfig();
    }
  }

  private updateAzureAIConfig() {
    this.isWait = true;
    this.azureAIService
      .putAzureAIConfig({ ...this.azureAI },this.data)
      .subscribe({
        next: (res: any) => {
          this.getAzureAIConfig();
          this.isWait = false;
          this.dialogRef.close('success');
        },
        error: (err: any) => {
          this.isWait = false;
        },
      });
  };

    createAzureAIConfig() {
    this.isWait = true;
    this.azureAIService
      .createAzureAIConfig({...this.azureAI})
      .subscribe({
        next: (res: any) => {
          this.isWait = false;
          this.dialogRef.close('success');
        },
        error: (err: any) => {
          this.isWait = false;
        },
      });
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = false;
  }

  onClose() {
    this.dialogRef.close();
    }

}
