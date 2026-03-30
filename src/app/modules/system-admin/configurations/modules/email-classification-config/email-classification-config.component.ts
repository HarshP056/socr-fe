import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { MessageUserService } from 'src/app/services';
import { EmailClassificationService } from 'src/app/services/email-classification.service';
import { Location } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { faCopy, faTasks, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-email-classification-config',
  templateUrl: './email-classification-config.component.html',
  styleUrls: ['./email-classification-config.component.scss']
})
export class EmailClassificationConfigComponent implements OnInit {
    @ViewChild(MatMenuTrigger) ddTrigger: MatMenuTrigger;
    faCopy = faCopy;
    faTasks = faTasks;
    faPencil = faPencil;
    faTrash = faTrash;
    emailClassifiers: any = [];
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

    constructor(
      private messageSer: MessageUserService,
      private emailClassificationService: EmailClassificationService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private location: Location
    ) {
      this.messageSer.appSidebar = false;
    }

    ngOnInit() {
      this.initialLoader=true;
      this.getAllEmailClassification();
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

    deleteEmailClassification(id: number) {
      this.emailClassificationService.deleteEmailClassification(id).subscribe({
        next: (res: any) => {
          this.getAllEmailClassification();
        },
        error: (err: any) => {

        },
      });
    }

    editEmailClassification(element: any){
      this.router.navigateByUrl(
        '/system-admin/configurations/email-classification/edit/' + element
      );
    }

    getAllEmailClassification() {
      this.emailClassificationService.getEmailClassificationByPage(this.getArgsObj()).subscribe({
        next: (res: any) => {
          this.emailClassifiers = res['content'];
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
      this.getAllEmailClassification();
    }

    search() {
      this.isLoading = true;
      this.page = 1;
      this.getAllEmailClassification();
    }

    onPaginateChange(event: any) {
      this.initialLoader = true;
      this.page = event.pageIndex + 1;
      this.size = event.pageSize;
      this.queryParams.page = this.page;
      this.queryParams.size = this.size;
      this.getAllEmailClassification();
    }

    updateEmailClassification(event: any, data:any) {
      this.isWait = true;
      console.log(event, data);
      this.emailClassificationService.putEmailClassification(data, data.id).subscribe({
        next: (res: any) => {
          this.isWait = false;
          this.getAllEmailClassification();
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
