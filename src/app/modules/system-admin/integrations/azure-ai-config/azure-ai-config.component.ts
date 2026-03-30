import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { MessageUserService } from 'src/app/services';
import { AzureAiService } from 'src/app/services/azure-ai.service';
import { OpenAzureAiDialogComponent } from './open-azure-ai-dialog/open-azure-ai-dialog.component';

@Component({
  selector: 'app-azure-ai-config',
  templateUrl: './azure-ai-config.component.html',
  styleUrls: ['./azure-ai-config.component.scss']
})
export class AzureAiConfigComponent implements OnInit {

  @ViewChild(MatMenuTrigger) ddTrigger: MatMenuTrigger;
  azureAIConfig: any = [];
  displayedColumns: string[] = [
    'name',
    'endpoint',
    'apiVersion',
    'action'
  ];
  name: string = '';
  initialLoader:boolean = false;
  isWait: boolean = false;
  constructor(
    private messageSer: MessageUserService,
    private azureAIService: AzureAiService,
    private dialog: NgDialogAnimationService,
    private messageService: MessageService
  ) {
    this.messageSer.appSidebar = false;
  }
  ngOnInit() {
    this.initialLoader=true;
    this.getAllAzureAIConfig();
  }
  getAllAzureAIConfig() {
    this.azureAIService.getAllAzureAIConfig().subscribe({
      next: (res: any) => {
        this.initialLoader = false;
        this.azureAIConfig = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  deleteAzureAIConfig(id: number) {
    this.azureAIService.deleteAzureAIConfig(id.toString()).subscribe({
      next: (res: any) => {
        this.getAllAzureAIConfig();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Some error occurred!!',
        });
      },
    });
  }
  openDialog(id: string) {
    this.dialog
      .open(OpenAzureAiDialogComponent, {
        disableClose: true,
        height: '100%',
        width: '45%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: id,
      })
      .afterClosed()
      .subscribe((val) => {
        this.getAllAzureAIConfig();
      });
  }
  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }
}
