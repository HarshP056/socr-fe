import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { MessageUserService } from 'src/app/services';
import { RfpAiPromptConfigService } from 'src/app/services/rfp-ai-prompt-config.service';

@Component({
  selector: 'app-rfp-ai-prompt-config',
  templateUrl: './rfp-ai-prompt-config.component.html',
  styleUrls: ['./rfp-ai-prompt-config.component.scss']
})
export class RfpAiPromptConfigComponent implements OnInit {

  @ViewChild(MatMenuTrigger) ddTrigger: MatMenuTrigger;

  rfpAIPrompt: any = [];
  displayedColumns: string[] = [
    'name',
    'temperature',
    'maxTokens',
    'responseFormat',
    'role',
    'action'
  ];
  name: string = '';
  initialLoader:boolean = false;
  isWait: boolean = false;

  constructor(
    private messageSer: MessageUserService,
    private rfpAiPromptConfigService: RfpAiPromptConfigService,
    private dialog: NgDialogAnimationService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit() {
    this.initialLoader=true;
    this.getAllRFPAIPrompt();
  }

  getAllRFPAIPrompt() {
    this.rfpAiPromptConfigService.getAllAIPrompt().subscribe({
      next: (res: any) => {
        this.initialLoader = false;
        this.rfpAIPrompt = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteRFPAIPrompt(id: number) {
    this.rfpAiPromptConfigService.deleteAIPrompt(id).subscribe({
      next: (res: any) => {
        this.getAllRFPAIPrompt();
      },
      error: (err: any) => {

      },
    });
  }

  editRFPAIPrompt(element: any){
    this.router.navigateByUrl(
      '/system-admin/intelligence-hub/ai-prompt/edit-rfp-ai-prompt/' + element
    );
  }


  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }
}
