import { Component, Inject } from '@angular/core';
import { ChannelComponent } from '../../channel.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-view-channel-log',
  templateUrl: './view-channel-log.component.html',
  styleUrls: ['./view-channel-log.component.scss']
})
export class ViewChannelLogComponent {
  channelLogData:any=[]
  channelItemData:any=[];
  initialLoader:boolean =false;
  showData:boolean=false;
  totalElements:number=0;
  queryParams:any={
    limit: 10,
    order: '-startTime',
    page: 1
  }
  
  pageInd=0;
  constructor( private dialogRef: MatDialogRef<ChannelComponent>,
    private channelService: ChannelService,
    @Inject(MAT_DIALOG_DATA) public data: any){}
  
  ngOnInit(){
    console.log(this.data)
    this.getChannelLog()
  }

  private getArgsObj() {
    const obj: any = {
      limit: this.queryParams.limit,
      order: this.queryParams.order,
      page: this.queryParams.page
    };
    return obj;
  }

  getChannelLog(){
    this.channelService.getChannelExecutionLog(this.data, this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.channelLogData = res['content'];
        this.channelLogData.forEach((element:any) => {
          element['showItemsData'] = false
        });
        this.totalElements = res.totalElements;
        this.initialLoader = false;
        console.log(this.channelLogData)
      },
      error: (err: any) => {
        this.initialLoader = false;
      },
    });
  }

  showLineItemData(element:any){
    this.channelService.getChannelItemLog(element.txId).subscribe({
      next: (res: any) => {
        console.log(res)
        this.channelItemData.push(res[0]) ;
        console.log(this.channelItemData)
      },
      error: (err: any) => {
      },
    });
    element.showItemsData = !element.showItemsData
  }

  onPaginateChange(event: any) {
    this.pageInd = event.pageIndex + 1;
    this.queryParams.limit = event.pageSize;
    this.queryParams.page = this.pageInd;
    this.getChannelLog();
  }
}
