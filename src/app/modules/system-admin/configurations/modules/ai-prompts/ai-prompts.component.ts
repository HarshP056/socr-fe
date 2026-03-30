import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageUserService, AIPromptAndCriteriaService } from 'src/app/services';

@Component({
  selector: 'app-ai-prompts',
  templateUrl: './ai-prompts.component.html',
  styleUrls: ['./ai-prompts.component.scss']
})
export class AIPromptComponent implements OnInit {
  @ViewChild('savePromptData') savePromptData: NgForm;
  @ViewChild('saveCriteriaData') saveCriteriaData: NgForm;

  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  aiPromptCriteriaId: string = "AICriteria";
  aiPromptCriteria: any = {};
  criteria: any[] = [
    { name: "" }
  ];
  prompts: any[] = [
    { name: "" }
  ];
  isWait: boolean;

  constructor(
    private messageSer: MessageUserService,
    private aipromptService: AIPromptAndCriteriaService
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    // this.initialLoader = true;
    this.getPromptAndCriteriaConfig();
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }

  private getPromptAndCriteriaConfig() {
    this.aipromptService.getPromptAndCriteriaById(this.aiPromptCriteriaId).subscribe({
      next: (res: any) => {
        let result = res.result;
        this.prompts = [];
        this.criteria = [];

        if(result.prompt) {
          for (let index = 0; index < result.prompt.length; index++) {
            const element = result.prompt[index];
            this.prompts.push({"name": element});
          }
        }

        if(result.criteria) {
          for (let index = 0; index < result.criteria.length; index++) {
            const element = result.criteria[index];
            this.criteria.push({"name": element});
          }
        }

        //this.aiPromptCriteria = res;
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
    this.prompts.splice(index, 1);
  }

  addPrompts() {
    if(!this.prompts) {
      this.prompts = [];
    }
    this.prompts.push({name: ""});
  }

  removeCriteria(index: number) {
    this.criteria.splice(index, 1);
  }

  addCriteria() {
    if(!this.criteria) {
      this.criteria = [];
    }
    this.criteria.push({name: ""});
  }

  submit() {
    this.isWait = true;
    if(!this.aiPromptCriteria.prompt) {
      this.aiPromptCriteria.prompt = [];
    }

    if(!this.aiPromptCriteria.criteria) {
      this.aiPromptCriteria.criteria = [];
    }

    this.prompts.forEach((prompt: any) => {
      this.aiPromptCriteria.prompt.push(prompt.name);
    });

    this.criteria.forEach((criteria: any) => {
      this.aiPromptCriteria.criteria.push(criteria.name);
    });

    this.aipromptService.updatePromptAndCriteria({ ...this.aiPromptCriteria }, this.aiPromptCriteriaId).subscribe({
      next: (res: any) => {
        this.isWait = false;

      },
      error: (err: any) => {
        this.isWait = false;
      },
    })
  }

}
