import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageUserService } from 'src/app/services';
import { EmailClassificationService } from 'src/app/services/email-classification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-email-classification',
  templateUrl: './create-email-classification.component.html',
  styleUrls: ['./create-email-classification.component.scss']
})
export class CreateEmailClassificationComponent implements OnInit {
  @ViewChild('savePromptData') savePromptData: NgForm;

  editMode: string = 'new';
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  emailClassifierId: string = "";
  emailClassifier: any = {
    name: '',
    desc: '',
    temperature: 0,
    enabled: true
  };
  isWait: boolean = false;

  constructor(
    private messageSer: MessageUserService,
    private emailClassificationService: EmailClassificationService,
    private location : Location,
    private activateRoute: ActivatedRoute
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    let urlPath: string;
    this.activateRoute.url.subscribe((url: any) => {
      urlPath = url[0].path;
    });
    this.activateRoute.params.subscribe((params: any) => {
      //console.log(params);
      this.emailClassifierId = params.id;
      if (this.emailClassifierId) {
        this.initialLoader = true;
        this.editMode = urlPath == "create" ? "new" : "edit";
        this.getEmailClassifier();
      }
    });
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }

  private getEmailClassifier() {
    this.emailClassificationService.getEmailClassificationById(this.emailClassifierId).subscribe({
      next: (res: any) => {
        let result = res.result;
        this.emailClassifier = res.result;
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
      this.updateEmailClassification();
    }
    else{
      this.postEmailClassification();
    }

  }

  postEmailClassification(){
    this.emailClassificationService.createEmailClassification({ ...this.emailClassifier }).subscribe({
      next: (res: any) => {
        this.isWait = false;
        this.location.back();
      },
      error: (err: any) => {
        this.isWait = false;
      },
    })
  }

  updateEmailClassification(){
    this.emailClassificationService.putEmailClassification({ ...this.emailClassifier }, this.emailClassifierId).subscribe({
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

