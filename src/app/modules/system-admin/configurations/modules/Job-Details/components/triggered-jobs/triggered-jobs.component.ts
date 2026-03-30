import { formatDate } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import cronstrue from 'cronstrue';
import { QuartzService } from 'src/app/services/quartz.service';

@Component({
  selector: 'app-triggered-jobs',
  templateUrl: './triggered-jobs.component.html',
  styleUrls: ['./triggered-jobs.component.scss'],
})
export class TriggeredJobsComponent {
  initialLoader: boolean = false;
  triggeredJobs: any = {};
  convertedPattern: any;
  formattedDate: any;
  constructor(
    private dialogRef: MatDialogRef<TriggeredJobsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jobService: QuartzService
  ) {}

  ngOnInit() {
    this.initialLoader = true;
    this.runTrigger();
  }
  runTrigger() {
    this.jobService.updateTrigger(this.data.jobName).subscribe({
      next: (res: any) => {
        this.triggeredJobs = res;
        // const parsedDate = new Date(this.triggeredJobs.startTime);
        // this.formattedDate = parsedDate.toLocaleString();
        // console.log(this.triggeredJobs.startTime);
        // // this.formattedDate = formatDate(parsedDate, 'medium', 'en-US');
        // console.log(parsedDate);
        // console.log(this.formattedDate);
        this.convertedPattern = cronstrue.toString(
          this.triggeredJobs.cronExpression
        );
        this.initialLoader = false;
      },
      error: (err) => {
        this.initialLoader = false;
      },
    });
  }
}
