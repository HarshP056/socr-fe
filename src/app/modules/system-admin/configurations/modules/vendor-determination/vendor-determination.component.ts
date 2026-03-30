import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageUserService } from 'src/app/services';
import { OpenAiPromptConfigService } from 'src/app/services/open-ai-prompt-config.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vendor-determination',
  templateUrl: './vendor-determination.component.html',
  styleUrls: ['./vendor-determination.component.scss']
})

export class VendorDeterminationComponent implements OnInit {
  @ViewChild('savePromptData') savePromptData: NgForm;
  @ViewChild('saveCriteriaData') saveCriteriaData: NgForm;
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  aiPromptCriteriaId: string = "VENDOR_DETERMINATION";
  aiPromptCriteria: any = {
    promptName:'',
    modelName: '',
    responseFormat: '',
    openAiKey: '',
    temperature: 0,
    instructionList: [],
    contentDetails: [],
    responseInstruction: [],
  };
  instructionList: any[] = [
    { name: "" }
  ];
  contextDetails: any[] = [
    { name: "" }
  ];
  responseInstruction: any[] = [
    { name: "" }
  ];
  isWait: boolean;
  constructor(
    private messageSer: MessageUserService,
    private openAIConfigService: OpenAiPromptConfigService,
    private location : Location
  ) {
    this.messageSer.appSidebar = false;
  }
  ngOnInit(): void {
    this.initialLoader = true;
    this.getPromptAndCriteriaConfig();
  }
  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }
  private getPromptAndCriteriaConfig() {
    this.openAIConfigService.getAIPromptConfig(this.aiPromptCriteriaId).subscribe({
      next: (res: any) => {
        let result = res.result;
        this.aiPromptCriteria = res.result;
        this.instructionList = [];
        this.contextDetails = [];
        this.responseInstruction = [];
        console.log(result)
        if(result.instructionList) {
          for (let index = 0; index < result.instructionList.length; index++) {
            const element = result.instructionList[index];
            this.instructionList.push({"name": element});
          }
        }
        if(result.contextDetails) {
          for (let index = 0; index < result.contextDetails.length; index++) {
            const element = result.contextDetails[index];
            this.contextDetails.push({"name": element});
          }
        }
        if(result.responseInstruction) {
          for (let index = 0; index < result.responseInstruction.length; index++) {
            const element = result.responseInstruction[index];
            this.responseInstruction.push({"name": element});
          }
        }
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
  removeInstructionList(index: number) {
    this.instructionList.splice(index, 1);
  }
  addInstructionList() {
    if(!this.instructionList) {
      this.instructionList = [];
    }
    this.instructionList.push({name: ""});
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
  removeResponseInstruction(index: number) {
    this.responseInstruction.splice(index, 1);
  }
  addResponseInstruction() {
    if(!this.responseInstruction) {
      this.responseInstruction = [];
    }
    this.responseInstruction.push({name: ""});
  }
  submit() {
    this.isWait = true;
    if(!this.aiPromptCriteria.instructionList) {
      this.aiPromptCriteria.instructionList = [];
    }
    if(!this.aiPromptCriteria.contextDetails) {
      this.aiPromptCriteria.contextDetails = [];
    }
    if(!this.aiPromptCriteria.responseInstruction) {
      this.aiPromptCriteria.responseInstruction = [];
    }
    this.instructionList.forEach((instructionList: any) => {
      this.aiPromptCriteria.instructionList.push(instructionList.name);
    });
    this.contextDetails.forEach((contextDetails: any) => {
      this.aiPromptCriteria.contextDetails.push(contextDetails.name);
    });
    this.responseInstruction.forEach((responseInstruction: any) => {
      this.aiPromptCriteria.responseInstruction.push(responseInstruction.name);
    });
    this.openAIConfigService.createAIPromptConfig({ ...this.aiPromptCriteria }).subscribe({
      next: (res: any) => {
        this.isWait = false;
      },
      error: (err: any) => {
        this.isWait = false;
      },
    })
  }
  submitUpdateCall(){
    this.isWait = true;
    this.aiPromptCriteria.instructionList = [];
    this.aiPromptCriteria.contextDetails = [];
    this.aiPromptCriteria.responseInstruction = [];
    this.instructionList.forEach((instructionList: any) => {
      this.aiPromptCriteria.instructionList.push(instructionList.name);
    });
    this.contextDetails.forEach((contextDetails: any) => {
      this.aiPromptCriteria.contextDetails.push(contextDetails.name);
    });
    this.responseInstruction.forEach((responseInstruction: any) => {
      this.aiPromptCriteria.responseInstruction.push(responseInstruction.name);
    });
    this.openAIConfigService.putAIPromptConfig({ ...this.aiPromptCriteria }, this.aiPromptCriteriaId).subscribe({
      next: (res: any) => {
        this.isWait = false;
        this.location.back();
      },
      error: (err: any) => {
        this.isWait = false;
      },
    })
  }
}
