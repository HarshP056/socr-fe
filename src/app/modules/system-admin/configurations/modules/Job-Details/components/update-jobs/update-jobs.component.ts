import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import cronstrue from 'cronstrue';
import { MessageService } from 'primeng/api';
import { QuartzService } from 'src/app/services/quartz.service';

@Component({
  selector: 'app-update-jobs',
  templateUrl: './update-jobs.component.html',
  styleUrls: ['./update-jobs.component.scss'],
})
export class UpdateJobsComponent implements OnInit {
  isWait: boolean = false;
  showAllField: boolean = false;
  enableJobType: boolean = false;
  dailDropDownItem: boolean = false;
  showCronExpression: boolean = false;
  weeklyDropdownItem: boolean = false;
  montyhlyDropdownItem: boolean = false;
  editMode: string = 'new';
  quartzJobs: any = {
    cronExpession: '',
    cronType: '',
    dayOfMonth: '',
    dayOfWeek: '',
    hour: '',
    skJob: '',
    minute: '',
  };
  convertedPattern: any;
  cronTypeList: any[] = [];
  jobTypeList: any[] = [];
  minuteList: any[] = [];
  monthList: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  weekList: any[] = [1, 2, 3, 4, 5, 6, 7];
  hourList: any[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  constructor(
    private jobService: QuartzService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<UpdateJobsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.getCroneType();
    this.getJobType();
    for (let i = 1; i <= 59; i++) {
      this.minuteList.push(i);
    }
    if (this.data?.element && this.data?.element !== null) {
      this.quartzJobs = this.data.element;
      this.quartzJobs = {...this.quartzJobs}
      this.enableJobType = true;
      if (this.data.element.cronType === 'expression') {
        this.showAllField = false;
        this.showCronExpression = true;
        this.convertedPattern = cronstrue.toString(
          this.quartzJobs.cronExpession
        );
        this.weeklyDropdownItem = false;
        this.dailDropDownItem = false;
      } else if (this.data.cronType === 'daily') {
        this.showCronExpression = false;
        this.dailDropDownItem = true;
        this.showAllField = false;
        this.weeklyDropdownItem = false;
      } else if (this.data.cronType === 'weekly') {
        this.showAllField = false;
        this.weeklyDropdownItem = true;
        this.showCronExpression = false;
        this.dailDropDownItem = false;
      } else if (this.data.cronType === 'monthly') {
        this.showAllField = false;
        this.weeklyDropdownItem = false;
        this.showCronExpression = false;
        this.dailDropDownItem = false;
        this.montyhlyDropdownItem = true;
      }
      this.editMode = 'edit';
    } else {
      this.quartzJobs = {
        cronExpession: '',
        cronType: '',
        dayOfMonth: '',
        dayOfWeek: '',
        hour: '',
        skJob: '',
        minute: '',
      };
      this.enableJobType = false;
      this.editMode = 'new';
    }
  }

  onChangePattern(event: any) {
    this.convertedPattern = cronstrue.toString(event.target.value);
  }

  onClose() {
    this.dialogRef.close();
  }
  onChange(event: any) {
    if (event.value === 'expression') {
      this.showAllField = false;
      this.showCronExpression = true;
      this.weeklyDropdownItem = false;
      this.dailDropDownItem = false;
      this.montyhlyDropdownItem = false;
    } else if (event.value === 'daily') {
      this.showCronExpression = false;
      this.dailDropDownItem = true;
      this.showAllField = false;
      this.weeklyDropdownItem = false;
      this.montyhlyDropdownItem = false;
    } else if (event.value === 'weekly') {
      this.showAllField = false;
      this.weeklyDropdownItem = true;
      this.showCronExpression = false;
      this.dailDropDownItem = false;
      this.montyhlyDropdownItem = false;
    } else if (event.value === 'monthly') {
      this.showAllField = false;
      this.weeklyDropdownItem = false;
      this.showCronExpression = false;
      this.dailDropDownItem = false;
      this.montyhlyDropdownItem = true;
    }
  }
  getCroneType() {
    this.jobService.getCronTypes().subscribe({
      next: (res: any) => {
        this.cronTypeList = res;
      },
      error: (error) => {},
    });
  }

  getJobType() {
    this.jobService.getJobTypes().subscribe({
      next: (res: any) => {
        Object.keys(res).forEach((elem) => {
          const botsObject: any = {
            value: res[elem],
            key: elem,
          };
          this.jobTypeList.push(botsObject);
        });
        // const data = this.jobTypeList.filter((elem: any) => {
        //   console.log(this.quartzJobs.skJob);
        //   if (this.quartzJobs.skJob === elem.skJob) return elem;
        // });
        // console.log(data, 'data');
        this.jobTypeList = [...this.jobTypeList]
      },

      error: (error) => {},
    });
  }

  submit() {
    this.isWait = true;
    let checkJobsTypes = this.data?.selectedJobTypes.some((item:any)=>item === this.quartzJobs.skJob) 
    if(checkJobsTypes){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Job Type is already available',
      });
      this.isWait = false;
      return;
    }else if(!checkJobsTypes){
      if (!this.data.element) {
        this.jobService.postjob(this.quartzJobs).subscribe({
          next: (res: any) => {
            this.isWait = false;
            this.dialogRef.close('success');
          },
          error: (err: any) => {
            this.isWait = false;
            this.dialogRef.close('success');
          },
        });
      }
    }
    else {
        //   this.oauthProfileApi
        //     .updateOathProfile(this.oauthProfile, this.oauthProfile.id)
        //     .subscribe({
        //       next: (res: any) => {
        //         console.log(this.isWait);
        //         this.isWait = false;
        //         this.dialogRef.close('success');
        //       },
        //       error: (err: any) => {
        //         this.isWait = false;
        //       },
        //     });
        // }
      }
    }
    
}
