import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageUserService } from 'src/app/services';
import { EmailClassificationWorkflowService, EmailClassificationService } from 'src/app/services';
import { Location } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { faCopy, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {
    faCopy = faCopy;
    faPencil = faPencil;
    faTrash = faTrash;
    emailClassifier: any;
    workflows: any[] = [];
    displayedColumns: string[] = [
      'name',
      'desc',
      'confidence',
      'action'
    ];
    name: string = '';
    initialLoader:boolean = false;
    isWait: boolean = false;
    isLoading: boolean = false;
    resettingLoader: boolean = false;

    queryParams: any = {
      limit: 10,
      order: '-name',
      page: 1,
      query: ''
    };
    total: number = 0;
    page: number = 1;
    size: number = 10;
    limits = [5, 10, 25, 50];
    pageEvent: PageEvent;
    emailClassifierId: string;

    constructor(
      private messageSer: MessageUserService,
      private emailClassificationService: EmailClassificationService,
      private emailClassificationWorkflowService: EmailClassificationWorkflowService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private location: Location
    ) {
      this.messageSer.appSidebar = false;
    }

    ngOnInit() {
      this.activatedRoute.params.subscribe((params: any) => {
        this.emailClassifierId = params.id;
        if (this.emailClassifierId) {
          this.initialLoader = true;
          this.getEmailClassificationWorkflows();
          this.getEmailClassificationById();
        }
      });      
    }

    private getArgsObj() {
      const obj: any = {
        limit: this.queryParams.limit,
        order: this.queryParams.order,
        page: this.queryParams.page
      };
      if (this.queryParams.query)
        obj['query'] = this.queryParams.query;
      
      return obj;
    }

    getEmailClassificationById() {
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

    getEmailClassificationWorkflows() {
      this.emailClassificationWorkflowService.getEmailClassificationWorkflowByPage(this.getArgsObj(), this.emailClassifierId).subscribe({
        next: (res: any) => {
          this.workflows = res['content'];
          this.total = res.totalElements;
          this.initialLoader = false;
          this.resettingLoader = false;
          this.isLoading = false;

          this.updateQueryParams(
            this.queryParams.limit,
            this.queryParams.page,
            this.queryParams.order,
            this.queryParams.query,
          );
        },
        error: (err: any) => {
          this.isLoading = false;
          this.resettingLoader = false;
          this.initialLoader = false;
        },
      });
    }

    deleteEmailClassificationWorkflow(id: string) {
      this.emailClassificationWorkflowService.deleteEmailClassificationWorkflow(id).subscribe({
        next: (res: any) => {
          this.getEmailClassificationWorkflows();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }

    editEmailClassificationWorkflow(element: any){
      this.router.navigateByUrl(`/system-admin/configurations/email-classification/${this.emailClassifierId}/workflows/edit/` + element);
    }

    private updateQueryParams(
      _limit: number,
      _page: number,
      _order: string,
      _query: any | '',
    ) {
      const queryParams: any = {
        limit: _limit,
        page: _page,
        order: _order,
        query: _query || '',
      };
      const url = this.router
        .createUrlTree([], {
          relativeTo: this.activatedRoute,
          queryParams: queryParams,
        })
        .toString();
      this.location.replaceState(url);
    }

    reset() {
      this.resettingLoader = true;
      this.queryParams.order = '-id';
      this.queryParams.query = '';
      this.queryParams.limit = 10;
      this.queryParams.page = 1;
      this.page = 1;
      this.updateQueryParams(
        this.queryParams.limit,
        this.queryParams.page,
        (this.queryParams.order = 'id'),
        ''
      );
      this.resettingLoader = true;
      this.getEmailClassificationWorkflows();
    }

    search() {
      this.isLoading = true;
      this.page = 1;
      this.getEmailClassificationWorkflows();
    }

    onPaginateChange(event: any) {
      this.initialLoader = true;
      this.page = event.pageIndex + 1;
      this.size = event.pageSize;
      this.queryParams.page = this.page;
      this.queryParams.size = this.size;
      this.getEmailClassificationWorkflows();
    }

    updateEmailClassificationWorkflow(event: any, data:any) {
      this.isWait = true;
      console.log(event, data);
      this.emailClassificationWorkflowService.updateEmailClassificationWorkflow(data, data.id).subscribe({
        next: (res: any) => {
          this.isWait = false;
          this.getEmailClassificationWorkflows();
        },
        error: (err: any) => {
          this.isWait = false;
        },
      })
    }

    copyEmailClassification(id: string) {
      this.router.navigateByUrl('/system-admin/configurations/email-classification/create/' + id);
    }

    ngOnDestroy() {
      this.messageSer.appSidebar = true;
    }
  }
