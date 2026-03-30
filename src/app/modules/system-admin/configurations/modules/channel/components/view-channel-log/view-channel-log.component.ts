import { Component, Inject } from '@angular/core';
import { ChannelComponent } from '../../channel.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChannelService } from 'src/app/services/channel.service';
import { Sort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { start } from '@popperjs/core';
import moment from 'moment';

@Component({
  selector: 'app-view-channel-log',
  templateUrl: './view-channel-log.component.html',
  styleUrls: ['./view-channel-log.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewChannelLogComponent {
  channelLogData:any=[]
  channelItemData:any=[];
  initialLoader:boolean =false;
  laterLoader:boolean=false;
  showData:boolean=false;
  totalElements:number=0;
  queryParams:any={
    limit: 10,
    order: '-startTime',
    page: 1,
    receivedDate: [],
    fromDate: '',
    toDate: '',
    status: '',
  }
  isLoading: boolean = false;
  resettingLoader: boolean = false;

  displayedColumns =[
    'startTime',
    'completionTime',
    'count',
    'status',
    'exType',
    'completedIn',
    'actions'
  ]
  statusList: any[] = [
    'Success',
    'Failed'
  ];
  pageInd=0;
  maxDate = new Date();

  channelType: any;
  constructor( private dialogRef: MatDialogRef<ChannelComponent>,
    private channelService: ChannelService,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(){
    this.initialLoader = true;
    this.getChannelLog()
  }

  private getArgsObj() {
    const obj: any = {
      limit: this.queryParams.limit,
      order: this.queryParams.order,
      page: this.queryParams.page
    };
    if (this.queryParams.status) {
      obj['status'] = this.queryParams.status;
    }
    if (this.queryParams?.receivedDate?.length > 0){
      obj['fromDate'] = this.queryParams.fromDate.split('T')[0];
      obj['toDate'] = this.queryParams.toDate.split('T')[0];
      // obj['receivedDate'] =
      //   this.queryParams.fromDate.split('T')[0] +
      //   '-' +
      //   this.queryParams.toDate.split('T')[0];
    }
    return obj;
  }

  getChannelLog(){
    this.channelService.getChannelExecutionLog(this.data.id, this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.channelLogData = res['content'];
        this.channelType = this.data.type;
        this.channelLogData.forEach((element:any) => {
          element['showItemsData'] = false
        });
        this.totalElements = res.totalElements;
        this.initialLoader = false;
        this.resettingLoader = false;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.initialLoader = false;
        this.resettingLoader = false;
        this.isLoading = false;
      },
    });
  }

  showLineItemData(element:any, index:any){
    this.laterLoader = true;
    this.channelLogData[index]['lineItems']=[];
    if(!element.showItemsData ){
      this.channelService.getChannelItemLog(element.txId).subscribe({
        next: (res: any) => {
          this.laterLoader = false;
          this.channelLogData[index]['lineItems']=res;
        },
        error: (err: any) => {
        },
      });
    }
    element.showItemsData = !element.showItemsData
  }

  onPaginateChange(event: any) {
    this.initialLoader = true;
    this.pageInd = event.pageIndex + 1;
    this.queryParams.limit = event.pageSize;
    this.queryParams.page = this.pageInd;
    this.getChannelLog();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = sort.active;
      this.pageInd;
      this.queryParams.limit;
      this.getChannelLog();
    } else if (sort.direction === 'desc') {
      this.queryParams.order = '-' + sort.active;
      this.pageInd;
      this.queryParams.limit;
      this.getChannelLog();
    }
  }

  getData(data:any){
    if(!data.startTime || !data.completionTime){
      return;
    }
    let startDate = new Date(data.startTime)
    let endDate = new Date(data.completionTime)
    if(startDate && endDate){
      let diffTime = endDate.valueOf() - startDate.valueOf();
      let days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      let hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      let minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))
      let secs = Math.floor((diffTime % (1000 * 60)) / (1000))
      return days+'d '+hours+'h '+minutes+'m '+secs+'s'
    }
    return '';
  }

  onDateRangeSelected() {
    if (this.queryParams.receivedDate?.length) {
      this.queryParams.fromDate = moment.utc(this.queryParams.receivedDate[0])
        .startOf('day')
        .toISOString();
      this.queryParams.toDate = moment.utc(this.queryParams.receivedDate[1])
        .endOf('day')
        .toISOString();
    }
    console.log(this.queryParams)
  }

  removeDate() {
    this.queryParams.receivedDate = [];
    this.queryParams.fromDate = '';
    this.queryParams.toDate = '';
  }

  reset() {
    this.resettingLoader = true;
    this.queryParams.order = '-startTime';
    this.queryParams.limit = 10;
    this.queryParams.page = 1;
    this.queryParams.status ='';
    this.queryParams.receivedDate= [];
    this.resettingLoader = true;
    this.getChannelLog();
  }
  search() {
    this.isLoading = true;
    this.queryParams.page = 1;
    this.getChannelLog();
  }
}
