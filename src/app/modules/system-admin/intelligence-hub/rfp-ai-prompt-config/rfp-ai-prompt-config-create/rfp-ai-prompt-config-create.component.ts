import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageUserService } from 'src/app/services';
import { RfpAiPromptConfigService } from 'src/app/services/rfp-ai-prompt-config.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rfp-ai-prompt-config-create',
  templateUrl: './rfp-ai-prompt-config-create.component.html',
  styleUrls: ['./rfp-ai-prompt-config-create.component.scss']
})
export class RfpAiPromptConfigCreateComponent implements OnInit {


  @ViewChild('savePromptData') savePromptData: NgForm;

  editMode: any = 'new';
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  rfpAIPromptId: string = "";
  rfpAIPrompt: any = {
    name: '',
    metaPrompt: [],
    contextDetails: [],
    responseFormatDetails: [],
    userPrompt: [],
    temperature: 0,
    maxTokens: 0,
    responseFormat: '',
    role: ''
  };
  metaPrompt: any[] = [
    { name: "" }
  ];
  contextDetails: any[] = [
    { name: "" }
  ];
  responseFormatDetails: any[] = [
    { name: "" }
  ];
  userPrompt: any[] = [
    { name: "" }
  ];

  isWait: boolean = false;

  constructor(
    private messageSer: MessageUserService,
    private rfpAiPromptConfigService: RfpAiPromptConfigService,
    private location : Location,
    private activateRoute: ActivatedRoute
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      this.rfpAIPromptId = params.id;
      if (this.rfpAIPromptId) {
        this.initialLoader = true;
        this.editMode = 'edit';
        this.getRPFAIPrompt();
      }
    });
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }

  private getRPFAIPrompt() {
    this.rfpAiPromptConfigService.getAIPrompt(this.rfpAIPromptId).subscribe({
      next: (res: any) => {
        let result = res.result;
        this.rfpAIPrompt = res.result;
        this.metaPrompt = [];
        this.contextDetails = [];
        this.responseFormatDetails = [];
        this.userPrompt = [];
        console.log(result)
        if(result.metaPrompt) {
          for (let index = 0; index < result.metaPrompt.length; index++) {
            const element = result.metaPrompt[index];
            this.metaPrompt.push({"name": element});
          }
        }
        if(result.contextDetails) {
          for (let index = 0; index < result.contextDetails.length; index++) {
            const element = result.contextDetails[index];
            this.contextDetails.push({"name": element});
          }
        }
        if(result.responseFormatDetails) {
          for (let index = 0; index < result.responseFormatDetails.length; index++) {
            const element = result.responseFormatDetails[index];
            this.responseFormatDetails.push({"name": element});
          }
        }
        if(result.userPrompt) {
          for (let index = 0; index < result.userPrompt.length; index++) {
            const element = result.userPrompt[index];
            this.userPrompt.push({"name": element});
          }
        }
        console.log(this.metaPrompt)
        this.initialLoader = false;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.resettingLoader = false;
        this.initialLoader = false;
      },
    });
  }

  removePrompt(index: number) {
    this.metaPrompt.splice(index, 1);
  }

  addPrompts() {
    if(!this.metaPrompt) {
      this.metaPrompt = [];
    }
    this.metaPrompt.push({name: ""});
  }

  removeContextDetails(index: number) {
    this.contextDetails.splice(index, 1);
  }

  addContextDetails() {
    if(!this.contextDetails) {
      this.contextDetails = [];
    }
    this.contextDetails.push({name: ""});
  }

  removeResponseFormatDetails(index: number) {
    this.responseFormatDetails.splice(index, 1);
  }

  addResponseFormatDetails() {
    if(!this.responseFormatDetails) {
      this.responseFormatDetails = [];
    }
    this.responseFormatDetails.push({name: ""});
  }

  removeUserPrompt(index: number) {
    this.userPrompt.splice(index, 1);
  }

  addUserPrompt() {
    if(!this.userPrompt) {
      this.userPrompt = [];
    }
    this.userPrompt.push({name: ""});
  }

  submit() {
    this.isWait = true;
    this.rfpAIPrompt.metaPrompt = [];
    this.rfpAIPrompt.contextDetails = [];
    this.rfpAIPrompt.responseFormatDetails = [];
    this.rfpAIPrompt.userPrompt = [];

    this.metaPrompt.forEach((prompt: any) => {
      this.rfpAIPrompt.metaPrompt.push(prompt.name);
    });

    this.contextDetails.forEach((context: any) => {
      this.rfpAIPrompt.contextDetails.push(context.name);
    });

    this.responseFormatDetails.forEach((contextDescription: any) => {
      this.rfpAIPrompt.responseFormatDetails.push(contextDescription.name);
    });

    this.userPrompt.forEach((userPrompt: any) => {
      this.rfpAIPrompt.userPrompt.push(userPrompt.name);
    });

    if (this.editMode === 'edit') {
      this.updateRFPAIPrompt();
    }
    else{
      this.postRFPAIPrompt();
    }


  }

  postRFPAIPrompt(){
    this.rfpAiPromptConfigService.createAIPrompt({ ...this.rfpAIPrompt }).subscribe({
      next: (res: any) => {
        this.isWait = false;
        this.location.back();
      },
      error: (err: any) => {
        this.isWait = false;
      },
    })
  }

  updateRFPAIPrompt(){
    this.rfpAiPromptConfigService.putAIPrompt({ ...this.rfpAIPrompt }, this.rfpAIPromptId).subscribe({
      next: (res: any) => {
        this.isWait = false;
        this.location.back();
      },
      error: (err: any) => {
        this.isWait = false;
      },
    })
  }

  formatName(name: string): string {
    if (!name) {
      return '';
    }
    return name
      .split('_')
      .map((word, index) => {
        if (index === 0 && word === word.toUpperCase() && word.length <= 4) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }

}
