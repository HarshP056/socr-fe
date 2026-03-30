import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageUserService } from 'src/app/services';
import { EmailClassificationWorkflowService, EmailClassificationWorkflowConditionService, EmailClassificationService } from 'src/app/services';
import { Location } from '@angular/common';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-email-classifier-workflow',
  templateUrl: './create-workflow.component.html',
  styleUrls: ['./create-workflow.component.scss']
})
export class CreateEmailClassifierWorkflowComponent implements OnInit {
  editMode: string = 'new';
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  emailClassifierId: string = "";
  emailClassifier: any;
  workflowId: string = "";
  workflow: any = {
    classifierId: '',
    name: '',
    type: '',
    conditions: [],
    default: false,
    attachments: [],
    enabled: true
  };
  isWait: boolean = false;
  faAdd = faAdd;
  workFlowConditions: any[] = [];

  constructor(
    private messageSer: MessageUserService,
    private emailClassificationService: EmailClassificationService,
    private emailClassificationWorkflowService: EmailClassificationWorkflowService,
    private emailClassificationWorkflowConditionService: EmailClassificationWorkflowConditionService,
    private location: Location,
    private activateRoute: ActivatedRoute
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      //console.log(params);
      this.emailClassifierId = params.id;
      this.workflowId = params.workflowId;
      if (this.workflowId) {
        this.initialLoader = true;
        this.editMode = "edit";
        this.getEmailClassifierWorkFlow();
      } else {
        this.editMode = "new";
      }

      if(this.emailClassifierId) {
        this.getEmailClassifier();
      }      
    });    
    
    this.getWorkFlowConditions();
  }

  private getEmailClassifier() {
    this.emailClassificationService.getEmailClassificationById(this.emailClassifierId).subscribe({
      next: (res: any) => {
        if(res && res.result) {
          this.emailClassifier = res.result;
        }        
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  private getEmailClassifierWorkFlow() {
    this.emailClassificationWorkflowService.getEmailClassificationWorkflowById(this.workflowId).subscribe({
      next: (res: any) => {
        this.workflow = res.result;
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

  submit() {
    this.isWait = true;
    if (this.editMode === 'edit') {
      this.updateEmailClassificationWorkflow();
    }
    else {
      this.saveEmailClassificationWorkflow();
    }
  }

  saveEmailClassificationWorkflow() {
    this.workflow.classifierId = this.emailClassifierId;
    this.emailClassificationWorkflowService.createEmailClassificationWorkflow({ ...this.workflow }).subscribe({
      next: (res: any) => {
        this.isWait = false;
        this.location.back();
      },
      error: (err: any) => {
        this.isWait = false;
      },
    })
  }

  updateEmailClassificationWorkflow() {
    this.emailClassificationWorkflowService.updateEmailClassificationWorkflow({ ...this.workflow }, this.workflowId).subscribe({
      next: (res: any) => {
        this.isWait = false;
        this.location.back();
      },
      error: (err: any) => {
        this.isWait = false;
      },
    })
  }

  addCondition() {
    this.workflow.conditions.push({
      "name": "",
      "type": "",
      "value": ""
    })
  }

  getWorkFlowConditions() {
    this.emailClassificationWorkflowConditionService.getAllEmailClassificationWorkflowCondition().subscribe({
      next: (value: any) => {
        this.workFlowConditions = value;
      }, error: (err: any) => {
        console.log(err);
      },
    })
  }

  setConditionType(name: string, index: number) {
    this.workflow.conditions[index].type = this.workFlowConditions.find((wf:any) => wf.name == name).type;
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }

}

